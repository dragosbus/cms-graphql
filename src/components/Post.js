import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import UpdatePost from "./UpdatePost";
import EditMode from "./EditMode";

const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      body
    }
    isEditMode @client
  }
`;

export default class Post extends Component {
  render() {
    const { match } = this.props;
    return (
      <Query query={POST_QUERY} variables={{ id: match.params.id }}>
        {({ loading, data }) => {
          if (loading) return <p>Loading</p>;
          const { post, isEditMode } = data;
          return (
            <div>
              <EditMode isEditMode={isEditMode}/>
              {isEditMode ? (
                <section>
                  <h2>Edit post</h2>
                  <UpdatePost post={post} />
                </section>
              ) : (
                <section>
                  <h1>{post.title}</h1>
                </section>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}
