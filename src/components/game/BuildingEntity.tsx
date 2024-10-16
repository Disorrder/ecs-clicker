import { useMemo } from "react";
import { Button } from "~/components/ui/button";
import { useWorldStore } from "~/store/world.store";

interface Props extends React.ComponentProps<typeof Button> {
  buildings: number;
  /** Resources required to build the 1st building */
  ingredients: Record<string, number>;
}

export function BuildingEntity(props: Props) {
  const { buildings, ingredients, ...btnProps } = props;

  const resources = useWorldStore((state) => state.resources); // just watch
  const withdraw = useWorldStore((state) => state.withdraw);
  const canWithdraw = useWorldStore((state) => state.canWithdraw);

  const buildingCost = useMemo(() => {
    const cost: Record<string, number> = {};
    for (const slug in ingredients) {
      cost[slug] = ingredients[slug] * buildings;
    }
    return cost;
  }, [ingredients, buildings]);

  const disabled = !canWithdraw(buildingCost);

  function handleClick() {
    if (!withdraw(buildingCost)) return;
  }

  return (
    <Button
      className="w-40"
      disabled={disabled}
      onClick={handleClick}
      {...btnProps}
    />
  );
}
