import { useRef } from "react";
import { useAnimationFrame } from "~/hooks/useAnimationFrame";
import { useSettingsStore } from "~/store/settings.store";
import { useWorldStore } from "~/store/world.store";
import { TICK_MS } from "./const";

export function TimeSystem() {
  const timeRef = useRef(0);
  const lastTickTimeRef = useRef(0);

  const onTick = useWorldStore((state) => state.onTick);

  const paused = useSettingsStore((state) => state.paused);
  const speed = useSettingsStore((state) => state.speed);

  useAnimationFrame((dt) => {
    if (paused) return;

    const time = timeRef.current + dt * speed;
    const nextTick = lastTickTimeRef.current + TICK_MS;

    if (time >= nextTick) {
      console.log("before tick", lastTickTimeRef.current, time);
      onTick();
      lastTickTimeRef.current = nextTick;
    }

    timeRef.current = time;
  });

  return null;
}
