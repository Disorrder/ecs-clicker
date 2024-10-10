import { CraftEntity } from "~/components/game/CraftEntity";
import { HarvestEntity } from "~/components/game/HarvestEntity";
import { Resources } from "~/components/game/Resources";
import GameLayout from "./_layout";

export default function GamePage() {
  return (
    <GameLayout>
      <div className="flex gap-4 py-4">
        <div className="flex-1 px-4">
          <Resources />
        </div>
        <div className="flex-[2] space-y-4">
          <div className="space-y-2">
            <h4 className="">Harvest & Craft</h4>
            <hr />
            <div className="flex flex-wrap gap-2">
              <HarvestEntity products={{ rna: 1 }}>RNA</HarvestEntity>
              <CraftEntity ingredients={{ rna: 2 }} products={{ dna: 1 }}>
                DNA
              </CraftEntity>
            </div>
          </div>
        </div>
        <div className="flex-1 px-4">TODO: Log</div>
      </div>
    </GameLayout>
  );
}
