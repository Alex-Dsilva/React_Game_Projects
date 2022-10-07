// reducer related to cart state;

export const reducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
          return { ...state, Loading:"true"};
        case "SET_PLAYERX":
          console.log(action.payload)
          return { ...state, loading: false, PlayerX:{name:action.payload }};
        case "SET_PLAYERY":
          return { ...state,  loading: false, PlayerY:{name:action.payload }};
        case "SET_WINNERX":
          return {...state, loading:false, PlayerX:{wincount:action.payload }};
        case "SET_WINNERY":
          return {...state, loading:false, PlayerY:{wincount:action.payload }};
      default:
        return state;
    }
  };