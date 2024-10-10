import { useEffect } from "react";
import { useWorldStore } from "~/store/world.store";

export function AgeSystem() {
  const resources = useWorldStore((state) => state.resources);
  const patchResourceLimits = useWorldStore(
    (state) => state.patchResourceLimits,
  );
  const patchResources = useWorldStore((state) => state.patchResources);

  // biome-ignore lint/correctness/useExhaustiveDependencies: check once on start
  useEffect(() => {
    if (resources.size === 0) {
      patchResourceLimits({
        rna: 100,
        dna: 100,
      });
      patchResources({
        rna: 0,
        dna: 0,
      });
    }
  }, []);

  return null;
}
