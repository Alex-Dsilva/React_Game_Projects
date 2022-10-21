import { useContext } from "react";
import PrePostGameLayout from "../Layouts/PrePostGame";
import { Context } from "../Store";

function GameWon() {
  const { globalState } = useContext(Context);
  const { elapsed_seconds } = globalState.previous_game_stats;
  return (
    <PrePostGameLayout>
      <h1 className="font-size-3-rem text-danger mb-4">Bravo</h1>

      <p className="text-primary">
        Time Spent: <span className="bold"> {elapsed_seconds} seconds</span>
      </p>
    </PrePostGameLayout>
  );
}

export default GameWon;
