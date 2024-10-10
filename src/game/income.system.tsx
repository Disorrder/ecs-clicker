import { useEffect } from "react";
import { useWorldStore } from "~/store/world.store";

interface Props {
  resource: string;
  income: number;
}

export function IncomeSystem(props: Props) {
  const { resource, income } = props;

  const tick = useWorldStore((state) => state.tick);
  const charge = useWorldStore((state) => state.charge);

  // biome-ignore lint/correctness/useExhaustiveDependencies: depends on tick only
  useEffect(() => {
    charge(resource, income);
  }, [tick]);

  return null
}
