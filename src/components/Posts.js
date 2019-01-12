import React, { Component } from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import gql from "graphql-tag";

const POSTS_QUERY = gql`
  query allPosts($skip: Int) {
    posts(orderBy: createdAt_DESC, first: $skip) {
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
        {({ loading, error, data, fetchMore }) => {
          if (loading) return <p>Loading</p>;
          if (error) return <p>Error</p>;
          const { posts } = data;
          console.log(posts);
          return (
            <React.Fragment>
              {posts.map(post => (
                <li key={post.id}>
                  <Link to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() =>
                    fetchMore({
                      variables: {
                        skip: posts.length
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;
                        return Object.assign({}, prev, {
                          posts: [...prev.posts, ...fetchMoreResult.posts]
                        });
                      }
                    })
                  }
                >
                  Load More
                </button>
              </li>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
