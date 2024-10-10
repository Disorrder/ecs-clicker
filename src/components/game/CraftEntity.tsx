import { Button } from "~/components/ui/button";
import { useWorldStore } from "~/store/world.store";

interface Props extends React.ComponentProps<typeof Button> {
  ingredients: Record<string, number>;
  products: Record<string, number>;
}

export function CraftEntity(props: Props) {
  const { products, ingredients, ...btnProps } = props;

  const charge = useWorldStore((state) => state.charge);
  const withdraw = useWorldStore((state) => state.withdraw);

  function handleClick() {
    try {
      if (!withdraw(ingredients)) return;
      charge(products);
    } catch (e) {
      console.error(e);
    }
  }

  return <Button className="w-40" onClick={handleClick} {...btnProps} />;
}
