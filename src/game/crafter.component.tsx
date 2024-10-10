import { useEffect } from "react";
import { useWorldStore } from "~/store/world.store";

interface Props {
  buildings: number;
  ingredients: Record<string, number>;
  products: Record<string, number>;
}

export function CrafterComponent(props: Props) {
  const { buildings, ingredients, products } = props;

  const tick = useWorldStore((state) => state.tick);
  const charge = useWorldStore((state) => state.charge);
  const withdraw = useWorldStore((state) => state.withdraw);

  // biome-ignore lint/correctness/useExhaustiveDependencies: depends on tick only
  useEffect(() => {
    const spend: Record<string, number> = {};
    for (const slug in ingredients) {
      spend[slug] = ingredients[slug] * buildings;
    }
    if (!withdraw(spend)) return;

    const produce: Record<string, number> = {};
    for (const slug in products) {
      produce[slug] = products[slug] * buildings;
    }
    charge(produce);
  }, [tick]);

  return null;
}
