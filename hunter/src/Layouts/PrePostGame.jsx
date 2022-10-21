import character from "../Assets/icons/character.svg";
import { useHistory, useLocation } from "react-router-dom";

import styles from "./PrePostGame.module.scss";
import { useContext, useState } from "react";
import { Context } from "../Store";

function PrePostGameLayout({ children }) {
  const [selectShouldBeWhite, setSelectShouldBeWhite] = useState(true);
  const { globalState, dispatch } = useContext(Context);
  const { grid_side } = globalState;
  const [gridSide, setGridSide] = useState(grid_side);
  const history = useHistory();
  const { pathname } = useLocation();

  const startGame = (event) => {
    event.preventDefault();
    dispatch({
      type: "SET_GRID_SIDE",
      payload: { grid_side: Number(gridSide) },
    });
    history.push("/game");
  };

  return (
    <div className={styles.main}>
      <section className={styles.left_dot_grid}></section>
      <section className={styles.content}>
        <img
          className={`mb-6 ${styles.game_character}`}
          src={character}
          alt="Game Character"
        />

        <div className="mb-6">{children}</div>

        <form onSubmit={startGame}>
          <div className="d-flex align-items-center justify-content-center mb-8 mt-8">
            <p className={`mr-4 ${styles.grid_selector_text}`}>Game grid</p>
            <select
              onChange={({ target }) => setGridSide(target.value)}
              value={gridSide}
              name="game_grid"
              className={styles.grid_select}
              style={{ color: selectShouldBeWhite ? "white" : "black" }}
              onMouseOver={() => setSelectShouldBeWhite(false)}
              onMouseOut={() => setSelectShouldBeWhite(true)}
            >
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <option value={index + 5} key={index}>
                    {index + 5}
                  </option>
                ))}
            </select>
          </div>

          <button className={styles.action_button}>
            {pathname === "/" ? "Start Game" : "Start Again"}
          </button>
        </form>
      </section>
      <section className={styles.right_dot_grid}></section>
    </div>
  );
}

export default PrePostGameLayout;
