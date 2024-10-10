import { useEffect, useRef } from "react";

export const useTimeout = (
  callback: (dt: number, time: number) => void,
  interval: number = 1000 / 60 // 60 FPS
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animate = () => {
    const currentTime = performance.now();
    
    if (startTimeRef.current === null) {
      startTimeRef.current = currentTime;
    }

    const time = currentTime - startTimeRef.current;

    if (previousTimeRef.current !== null) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime, time);
    }

    previousTimeRef.current = time;
    timeoutRef.current = setTimeout(animate, interval);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: animate changes every render
  useEffect(() => {
    timeoutRef.current = setTimeout(animate, interval);
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, interval]);
};
