import React, { useReducer } from "react";
import { reducer } from "./reducer";

export const WinnerContext = React.createContext();

function WinnerContextProvider({ children }) {
  const instate={
    PlayerX:{
      name:"",
      wincount:0,
    },
    PlayerY:{
      name:"",
      wincount:0,
    },
    Loading:false,
  }
  const [state, dispatch] = useReducer(reducer, instate)
    // const [Winner, setWinner] = useState('');
  
    const EnterWinner = (val) => {
      setWinner(val);
    };
  
    return (
      <WinnerContext.Provider value={{ state, dispatch }}>
        {children}
      </ WinnerContext.Provider>
    );
  }
  export default WinnerContextProvider;

