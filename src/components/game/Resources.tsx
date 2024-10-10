import { useWorldStore } from "~/store/world.store";

export function Resources() {
  const resources = useWorldStore((state) => state.resources);
  const resourceLimits = useWorldStore((state) => state.resourceLimits);

  return (
    <div>
      Resources:
      {Array.from(resources.entries()).map(([slug, amount]) => {
        const limit = resourceLimits.get(slug);
        return (
          <div key={slug}>
            {slug}: {amount} / {limit}
          </div>
        );
      })}
    </div>
  );
}
