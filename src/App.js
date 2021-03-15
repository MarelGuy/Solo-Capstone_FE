import './index.css';

import React, { PureComponent } from 'react'

import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from 'react-bootstrap';

import Home from "./pages/Home"
import Login from "./pages/Login"
import Scpage from "./pages/Scpage"
import Signup from "./pages/Signup"
import ForumPage from "./pages/ForumPage"
import NewForum from "./pages/NewForum"
import NewScp from "./pages/NewScp"
import DocumentPage from "./pages/DocumentPage"

import ScpNav from "./components/ScpNav"
import ScpFooter from "./components/ScpFooter"


class App extends PureComponent {

  render() {

    return (
      <Router>
        <Container>
          <Route path={["/", "/scp/:scpId/doc/:docId", "/new/forum", "/new/scp", "/scp/:id", "/forum/:id"]} exact component={ScpNav} />
          <Route path="/" exact component={Home} />
          {/* Document pages */}
          <Route path="/scp/:scpId/doc/:docId" exact component={DocumentPage} />
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
        <Route path={["/", "/scp/:scpId/doc/:docId", "/new/forum", "/new/scp", "/login", "/signup", "/scp/:id", "/forum/:id"]} exact component={ScpFooter} />
      </Router>
    );
  }
}

export default App;
