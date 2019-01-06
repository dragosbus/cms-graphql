import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import PostForm from "./PostForm";

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(
      where: { id: $id }
      data: { status: PUBLISHED, title: $title, body: $body }
    ) {
      id
      title
      body
    }
  }
`;

export default class UpdatePost extends Component {
  render() {
    return (
      <Mutation mutation={UPDATE_POST}>
        {(updatePost, result) => {
          const onSuccess = () =>
            result.client.writeData({ data: { isEditMode: false } });
          return <PostForm onSubmit={updatePost} onSuccess={onSuccess} post={this.props.post} />
        }}
      </Mutation>
    );
  }
}
