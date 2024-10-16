import { useTick } from "~/hooks/useTick";
import { useWorldStore } from "~/store/world.store";

interface Props {
  multiplier: number;
  ingredients: Record<string, number>;
  products: Record<string, number>;
}

export function CrafterComponent(props: Props) {
  const { multiplier, ingredients, products } = props;

  const charge = useWorldStore((state) => state.charge);
  const withdraw = useWorldStore((state) => state.withdraw);

  useTick(() => {
    const spend: Record<string, number> = {};
    for (const slug in ingredients) {
      spend[slug] = ingredients[slug] * multiplier;
    }
    if (!withdraw(spend)) return;

    const produce: Record<string, number> = {};
    for (const slug in products) {
      produce[slug] = products[slug] * multiplier;
    }
    charge(produce);
  });

  return null;
}
