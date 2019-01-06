import React, { Component } from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import gql from "graphql-tag";

const POSTS_QUERY = gql`
  query postsQuery {
    posts {
      id
      title
      body
    }
  }
`;

export default class Posts extends Component {
  render() {
    return (
      <Query query={POSTS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading</p>;
          if (error) return <p>Error</p>;
          const { posts } = data;
          return (
            <ul>
              {posts.map(post => (
                <li key={post.id}>
                  <Link to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}
