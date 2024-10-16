import { useEffect } from "react";
import { useWorldStore } from "~/store/world.store";

export function useTick(cb: (tick: number) => void) {
  const tick = useWorldStore((state) => state.tick);

  // biome-ignore lint/correctness/useExhaustiveDependencies: cb depends on tick only
  useEffect(() => {
    cb(tick);
  }, [tick]);
}

export function useDay(cb: (day: number) => void) {
  const day = useWorldStore((state) => state.day);

  // biome-ignore lint/correctness/useExhaustiveDependencies: cb depends on day only
  useEffect(() => {
    cb(day);
  }, [day]);
}

export function useYear(cb: (year: number) => void) {
  const year = useWorldStore((state) => state.year);

  // biome-ignore lint/correctness/useExhaustiveDependencies: cb depends on year only
  useEffect(() => {
    cb(year);
  }, [year]);
}
