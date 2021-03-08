import './index.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Scpage from "./pages/Scpage"
import Signup from "./pages/Signup"
import ForumPage from "./pages/ForumPage"

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/scp/:id" exact component={Scpage} />
      <Route path="/forum/:id" exact component={ForumPage} />
      <Route path="/signup" exact component={Signup} />
    </Router>
  );
}

export default App;
