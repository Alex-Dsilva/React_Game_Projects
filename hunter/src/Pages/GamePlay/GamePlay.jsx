import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Player from "../../Components/Player";
import useWindowSize from "../../hooks/useWindowSize";
import { Context } from "../../Store";
import Alert from "./Alert";
import ArrowKeyPad from "./ArrowKeyPad";
import formatSecondsToTimeString from "./formatSecondsToTimeString";
import styles from "./GamePlay.module.scss";
import generateFoodItems from "./generateFoodItems";

function GamePlay() {
  const [alert, setAlert] = useState({ display: false, content: "" });
  const { globalState, dispatch } = useContext(Context);
  const { width } = useWindowSize();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [gridArray, setGridArray] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [totalMoves, setTotalMoves] = useState(0);
  const history = useHistory();

  const grid = globalState.grid_side;
  const maxMoves = Math.ceil(grid * grid * 0.5);
  const isMobileBrowser = navigator.userAgentData.mobile;

  const smallScales = {
    5: 11,
    6: 7,
    7: 5,
    8: 4.3,
    9: 3.5,
    10: 2.8,
    11: 2.4,
    12: 1.9,
  };

  const normalScales = {
    5: 13,
    6: 11,
    7: 9,
    8: 7,
    9: 5,
    10: 4,
    11: 3.5,
    12: 3,
  };

  const SCALE = width > 576 ? normalScales[grid] : smallScales[grid];
  const squareUnit = grid * SCALE;
  const gridEdge = grid * grid * SCALE;

  const handleEndGame = () => {
    dispatch({
      type: "END_GAME",
      payload: {
        eaten_food: grid - foodItems.length,
        total_food: grid,
        elapsed_seconds: elapsedSeconds,
      },
    });
  };
  const handleKeyDown = ({ keyCode }) => {
    if (totalMoves === maxMoves) {
      handleEndGame();

      history.replace("/game-over");
    }
    let tempCoordinates = { ...coordinates };

    // left
    if ((keyCode === 37 || keyCode === 65) && coordinates.x - squareUnit >= 0) {
      tempCoordinates = { ...coordinates, x: coordinates.x - squareUnit };
      setTotalMoves(totalMoves + 1);
    }
    // top
    if ((keyCode === 38 || keyCode === 87) && coordinates.y - squareUnit >= 0) {
      tempCoordinates = { ...coordinates, y: coordinates.y - squareUnit };
      setTotalMoves(totalMoves + 1);
    }
    // right
    if (
      (keyCode === 39 || keyCode === 68) &&
      coordinates.x + squareUnit < gridEdge
    ) {
      tempCoordinates = { ...coordinates, x: coordinates.x + squareUnit };
      setTotalMoves(totalMoves + 1);
    }
    // bottom
    if (
      (keyCode === 40 || keyCode === 83) &&
      coordinates.y + squareUnit < gridEdge
    ) {
      tempCoordinates = { ...coordinates, y: coordinates.y + squareUnit };
      setTotalMoves(totalMoves + 1);
    }
    handleFoodIntake(tempCoordinates);
    setCoordinates(tempCoordinates);
  };

  const handleFoodIntake = (coordinates) => {
    const rowIndex = Math.ceil(coordinates.x / squareUnit);
    const colIndex = Math.ceil(coordinates.y / squareUnit);

    if (gridArray[rowIndex][colIndex] === "x") {
      const newGridArray = JSON.parse(JSON.stringify(gridArray));
      newGridArray[rowIndex][colIndex] = 0;
      setGridArray(newGridArray);
      const foodItems = generateFoodItems({
        gridArray: newGridArray,
        SCALE,
        squareUnit,
        grid,
      });
      if (!foodItems.length) {
        handleEndGame();
        history.replace("/game-won");
      }
      setFoodItems(foodItems);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(elapsedSeconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [elapsedSeconds]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    const generateGridArray = () => {
      const gridArray = Array(grid)
        .fill(0)
        .map((_) => Array(grid).fill(0));

      const randomIndex1 = Math.floor(Math.random() * grid);
      const randomIndex2 = Math.floor(Math.random() * grid);

      gridArray[randomIndex1][randomIndex2] = "player";
      setCoordinates({
        x: randomIndex1 * squareUnit,
        y: randomIndex2 * squareUnit,
      });

      Array(grid)
        .fill("x")
        .forEach((foodItem) => {
          let randomIndex1 = Math.floor(Math.random() * grid);
          let randomIndex2 = Math.floor(Math.random() * grid);

          while (
            gridArray[randomIndex1][randomIndex2] === foodItem ||
            gridArray[randomIndex1][randomIndex2] === "player"
          ) {
            randomIndex1 = Math.floor(Math.random() * grid);
            randomIndex2 = Math.floor(Math.random() * grid);
          }
          gridArray[randomIndex1][randomIndex2] = foodItem;
        });

      return gridArray;
    };

    const gridArray = generateGridArray();
    const foodItems = generateFoodItems({ gridArray, SCALE, squareUnit, grid });

    setFoodItems(foodItems);
    setGridArray(gridArray);
  }, [grid, squareUnit, SCALE]);

  useEffect(() => {
    const movement_instruction_displayed = JSON.parse(
      localStorage.getItem("movement_instruction_displayed")
    );

    if (isMobileBrowser && !movement_instruction_displayed) {
      setAlert({ display: true, content: "Use arrow keypad to move" });
      localStorage.setItem("movement_instruction_displayed", true);
    }

    if (!isMobileBrowser && !movement_instruction_displayed) {
      setAlert({ display: true, content: "Use WASD or Arrow Keys to move" });

      localStorage.setItem("movement_instruction_displayed", true);
    }
  }, [isMobileBrowser]);

  return (
    <div className={styles.main}>
      <div
        style={{ maxWidth: "100%" }} // `${grid * grid * SCALE + 2}px` }}
        className={styles.game_card}
      >
        <div className="d-flex justify-content-between aling-items-center">
          <p>
            Grid:
            <span className="bold ml-2">
              {grid} x {grid}
            </span>
          </p>
          <p>
            Time spent:
            <span className="bold ml-2">
              {formatSecondsToTimeString(elapsedSeconds)} secs
            </span>
          </p>
        </div>
        <div
          style={{
            width: `${grid * grid * SCALE + 2}px`,
          }}
          className={styles.game_board_wrapper}
        >
          <div
            style={{
              backgroundSize: `${grid * SCALE}px ${grid * SCALE}px`,
              height: `${grid * grid * SCALE + 2}px`,
            }}
            className={styles.game_board}
          >
            <Player coordinates={coordinates} width={grid * SCALE} />
            {foodItems}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p>
            Maximum moves:
            <span className="bold ml-2">{maxMoves}</span>
          </p>
          <p>
            Total moves:
            <span className="bold ml-2">{totalMoves}</span>
          </p>
        </div>
      </div>

      {isMobileBrowser && <ArrowKeyPad handleKeyDown={handleKeyDown} />}
      {alert.display && <Alert content={alert.content} setAlert={setAlert} />}
    </div>
  );
}

export default GamePlay;
