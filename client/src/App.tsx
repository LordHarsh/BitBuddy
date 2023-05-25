import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import HandleRedirectContainer from "./pages/HandleRedirect";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/history">
          <History />
        </Route>
        <Route exact path="/:shortId">
          <HandleRedirectContainer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
