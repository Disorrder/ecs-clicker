import { Button } from "~/components/ui/button";
import { useWorldStore } from "~/store/world.store";

interface Props extends React.ComponentProps<typeof Button> {
  resource: string;
  harvest: number;
}

export function HarvestEntity(props: Props) {
  const { resource, harvest } = props;

  const charge = useWorldStore((state) => state.charge);

  function handleClick() {
    charge(resource, harvest);
  }

  return <Button className="w-40" onClick={handleClick}>{resource}</Button>;
}
