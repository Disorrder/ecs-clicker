import { AgeSystem } from "./age.system";
import { TimeSystem } from "./time.system";

export function GameSystem() {
  return (
    <>
      <TimeSystem />
      <AgeSystem />
    </>
  );
}
