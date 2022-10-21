import { useContext } from "react";
import PrePostGameLayout from "../Layouts/PrePostGame";
import { Context } from "../Store";

function GameEnd() {
  const { globalState } = useContext(Context);
  const {
    eaten_food,
    total_food,
    elapsed_seconds,
  } = globalState.previous_game_stats;
  return (
    <PrePostGameLayout>
      <h1 className="font-size-3-rem text-danger mb-4">Game Over</h1>
      <p className="text-primary">
        Total Food:{" "}
        <span className="bold">
          {eaten_food}/{total_food}
        </span>
      </p>
      <p className="text-primary">
        Time Spent: <span className="bold"> {elapsed_seconds} seconds</span>
      </p>
    </PrePostGameLayout>
  );
}

export default GameEnd;
