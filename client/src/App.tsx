import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeContainer from "./pages/Home";
import HandleRedirectContainer from "./pages/HandleRedirect";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeContainer />
        </Route>
        <Route exact path="/:shortId">
          <HandleRedirectContainer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
