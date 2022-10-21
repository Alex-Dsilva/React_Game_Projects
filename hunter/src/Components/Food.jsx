import foodIcon from "../Assets/icons/food.svg";

function Food({ width, coordinates }) {
  return (
    <img
      width={width < 50 ? width - 15 : width - 25}
      style={{
        position: "absolute",
        paddingTop: width < 50 ? ".5rem" : ".8rem",
        paddingLeft: width < 50 ? ".5rem" : ".9rem",
        marginLeft: `${coordinates.x}px`,
        marginTop: `${coordinates.y}px`,
      }}
      src={foodIcon}
      alt="food"
    />
  );
}

export default Food;
