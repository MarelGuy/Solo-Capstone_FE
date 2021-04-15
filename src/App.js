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
import NewDocumentPage from "./pages/NewDocumentPage"
import UserPage from "./pages/UserPage"
import ProfilePage from "./pages/ProfilePage"
import SearchPage from "./pages/SearchPage"

import ScpNav from "./components/ScpNav"
import ScpFooter from "./components/ScpFooter"
import RedirectHome from "./components/RedirectHome"

class App extends PureComponent {

  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={RedirectHome} />
          <Container>
            {/* Navbar */}
            <Route width={{ marginBottom: "15px" }} path={[
              "/new/forum",
              "/new/scp",
              "/scp/:id",
              "/new/:scpId/doc/",
              "/forum/:id",
              "/doc/:id",
              "/user/:id",
              "/me",
              "/search/:data",
              "/home"
            ]} exact component={ScpNav} />
            {/* Home */}
            <Route path="/home" exact component={Home} />
            {/* Profile pages */}
            <Route path="/me" exact component={UserPage} />
            <Route path="/user/:id" exact component={ProfilePage} />
            {/* Post pages */}
            <Route path="/new/:scpId/doc/" exact component={NewDocumentPage} />
            <Route path="/new/forum" exact component={NewForum} />
            <Route path="/new/scp" exact component={NewScp} />
            {/* Auth pages */}
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            {/* Single pages */}
            <Route path="/doc/:id" exact component={DocumentPage} />
            <Route path="/scp/:id" exact component={Scpage} />
            <Route path="/forum/:id" exact component={ForumPage} />
            <Route path="/search/:data" exact component={SearchPage} />
            {/* Footer */}
            <Route path={[
              "/new/forum",
              "/new/scp",
              "/scp/:id",
              "/new/:scpId/doc/",
              "/forum/:id",
              "/doc/:id",
              "/user/:id",
              "/me",
              "/search/:data",
              "/home"
            ]} exact component={ScpFooter} />
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
