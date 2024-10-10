import { Button } from "~/components/ui/button";
import { useWorldStore } from "~/store/world.store";

interface Props extends React.ComponentProps<typeof Button> {
  products: Record<string, number>;
}

export function HarvestEntity(props: Props) {
  const { products, ...btnProps } = props;

  const charge = useWorldStore((state) => state.charge);

  function handleClick() {
    try {
      charge(products);
    } catch (e) {
      console.error(e);
    }
  }

  return <Button className="w-40" onClick={handleClick} {...btnProps} />;
}
