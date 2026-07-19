<script setup lang="ts">
const nuxtApp = useNuxtApp();
const direction = useScrollDirection();
const { navigate } = await useScrollChainNavigation();

function isAtBottom() {
  return (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2
  );
}

function isAtTop() {
  return window.scrollY <= 0;
}

// Reaching a boundary shouldn't be enough on its own to trigger a page
// change — that fires on the very first wheel tick after arriving, which
// feels accidental (e.g. the last tick of a normal scroll that happened to
// land you at the bottom). Instead, require some continued scroll intent
// *past* the boundary before treating it as "the user wants to move on."
const BOUNDARY_TRIGGER_PX = 400;
const BOUNDARY_IDLE_RESET_MS = 600;

let boundaryAccum = 0;
let boundaryDir: "down" | "up" | null = null;
let lastWheelTime = 0;

function resetBoundaryAccum() {
  boundaryAccum = 0;
  boundaryDir = null;
}

function onWheel(event: WheelEvent) {
  const now = Date.now();
  if (now - lastWheelTime > BOUNDARY_IDLE_RESET_MS) {
    resetBoundaryAccum();
  }
  lastWheelTime = now;

  if (event.deltaY > 0 && isAtBottom()) {
    if (boundaryDir !== "down") resetBoundaryAccum();
    boundaryDir = "down";
    boundaryAccum += event.deltaY;
    if (boundaryAccum >= BOUNDARY_TRIGGER_PX) {
      resetBoundaryAccum();
      nuxtApp.runWithContext(() => navigate("down"));
    }
  } else if (event.deltaY < 0 && isAtTop()) {
    if (boundaryDir !== "up") resetBoundaryAccum();
    boundaryDir = "up";
    boundaryAccum += -event.deltaY;
    if (boundaryAccum >= BOUNDARY_TRIGGER_PX) {
      resetBoundaryAccum();
      nuxtApp.runWithContext(() => navigate("up"));
    }
  } else {
    resetBoundaryAccum();
  }
}

let touchStartY = 0;

function onTouchStart(event: TouchEvent) {
  touchStartY = event.touches[0]?.clientY ?? 0;
}

function onTouchEnd(event: TouchEvent) {
  const endY = event.changedTouches[0]?.clientY ?? 0;
  const delta = touchStartY - endY;
  const SWIPE_THRESHOLD = 120;

  if (delta > SWIPE_THRESHOLD && isAtBottom()) {
    nuxtApp.runWithContext(() => navigate("down"));
  } else if (delta < -SWIPE_THRESHOLD && isAtTop()) {
    nuxtApp.runWithContext(() => navigate("up"));
  }
}

onMounted(() => {
  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("wheel", onWheel);
  window.removeEventListener("touchstart", onTouchStart);
  window.removeEventListener("touchend", onTouchEnd);
});

const pageTransition = computed(() => ({
  name:
    direction.value === "down"
      ? "scroll-next"
      : direction.value === "up"
        ? "scroll-prev"
        : "fade",
  // Capture the scroll position while it's still readable — the leave-active
  // class (applied right after this) takes the element out of normal document
  // flow, which would otherwise reset it to its own top. See the
  // --frozen-scroll usage in tokens.css.
  onBeforeLeave(el: Element) {
    (el as HTMLElement).style.setProperty(
      "--frozen-scroll",
      `${window.scrollY}px`,
    );
  },
  // window.scrollTo can't be "pre-set invisibly" while the entering page is
  // still position:fixed — the document has nothing to scroll to at that
  // point (the fixed page contributes no normal-flow height), so the browser
  // just clamps it straight back to 0. The correction has to happen once
  // normal flow actually resumes, i.e. once Vue removes the enter-active
  // class — which is exactly what onAfterEnter signals.
  async onAfterEnter(el: Element) {
    resetBoundaryAccum();
    const dir = direction.value;
    direction.value = null;
    if (dir !== "up") return;
    const htmlEl = el as HTMLElement;
    // Give layout a tick to settle back into normal flow before measuring.
    await nextTick();
    window.scrollTo(0, Math.max(0, htmlEl.scrollHeight - window.innerHeight));
  },
}));
</script>

<template>
  <div>
    <AppHeader />
    <NavOverlay />
    <NuxtPage :transition="pageTransition" />
  </div>
</template>
