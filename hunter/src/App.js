import { BrowserRouter as Router, Route } from "react-router-dom";
import GamePlay from "./Pages/GamePlay/GamePlay";
import GameStart from "./Pages/GameStart";
import GameOver from "./Pages/GameOver";
import GameWon from "./Pages/GameWon";
import Store from "./Store";

function App() {
  return (
    <Store>
      <Router>
        <Route exact path="/" component={GameStart} />
        <Route exact path="/game" component={GamePlay} />
        <Route path="/game-won" component={GameWon} />
        <Route path="/game-over" component={GameOver} />
      </Router>
    </Store>
  );
}

export default App;
