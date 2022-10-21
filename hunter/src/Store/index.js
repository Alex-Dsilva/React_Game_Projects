import { createContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_GRID_SIDE": {
      return {
        ...state,
        grid_side: action.payload.grid_side,
      };
    }
    case "END_GAME": {
      return {
        ...state,
        previous_game_stats: {
          eaten_food: action.payload.eaten_food,
          total_food: action.payload.total_food,
          elapsed_seconds: action.payload.elapsed_seconds,
        },
      };
    }
    default:
      return state;
  }
};

const initialState = {
  grid_side: 10,
  previous_game_stats: {
    eaten_food: 0,
    total_food: 0,
    elapsed_seconds: 0,
  },
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ globalState: state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
