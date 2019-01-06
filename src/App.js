import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";

import Post from "./components/Post";
import Posts from "./components/Posts";
import NewPost from "./components/NewPost";

const client = new ApolloClient({
  uri: "https://api-euwest.graphcms.com/v1/cjqao1br0hmqo01bnfy764u6h/master"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <header className="App-header">
              <Link to="/">Home</Link>
            </header>
            <Link to="/post/new">New Post</Link>
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route path="/post/new" component={NewPost} />
              <Route exact path="/post/:id" component={Post} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
