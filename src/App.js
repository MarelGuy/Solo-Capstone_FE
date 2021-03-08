import './index.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Scpage from "./pages/Scpage"
import Signup from "./pages/Signup"

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/scp/:id" exact component={Scpage} />
      <Route path="/signup" exact component={Signup} />
    </Router>
  );
}

export default App;
