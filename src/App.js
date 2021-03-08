import './index.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Scpage from "./pages/Scpage"
import Signup from "./pages/Signup"
import ForumPage from "./pages/ForumPage"
import NewForum from "./pages/NewForum"
import NewScp from "./pages/NewScp"

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      {/* Post pages */}
      <Route path="/new/forum" exact component={NewForum} />
      <Route path="/new/scp" exact component={NewScp} />
      {/* Auth pages */}
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      {/* Single pages */}
      <Route path="/scp/:id" exact component={Scpage} />
      <Route path="/forum/:id" exact component={ForumPage} />
    </Router>
  );
}

export default App;
