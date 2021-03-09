import './index.css';

import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from 'react-bootstrap';

import Home from "./pages/Home"
import Login from "./pages/Login"
import Scpage from "./pages/Scpage"
import Signup from "./pages/Signup"
import ForumPage from "./pages/ForumPage"
import NewForum from "./pages/NewForum"
import NewScp from "./pages/NewScp"

import ScpNav from "./components/ScpNav"
import ScpFooter from "./components/ScpFooter"


function App() {
  return (
    <Router>
      <Container>
        <ScpNav />
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
      </Container>
      <ScpFooter />
    </Router>
  );
}

export default App;
