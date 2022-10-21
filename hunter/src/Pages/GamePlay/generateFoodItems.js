import Food from "../../Components/Food";

const generateFoodItems = ({ gridArray, SCALE, squareUnit, grid }) => {
  const foodItems = [];
  gridArray.forEach((row, rowIndex) => {
    row.forEach((item, colIndex) => {
      if (item === "x") {
        foodItems.push(
          <Food
            key={`${rowIndex}-${colIndex}`}
            width={grid * SCALE}
            coordinates={{
              x: rowIndex * squareUnit,
              y: colIndex * squareUnit,
            }}
          />
        );
      }
    });
  });

  return foodItems;
};

export default generateFoodItems;
