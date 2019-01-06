import React, { Component } from "react";

export default class PostForm extends Component {

  static defaultProps = {
    post: {}
  }

  state = {
    id: this.props.post.id || '',
    title: this.props.post.title || "",
    body: this.props.post.body || ""
  };

  handleInput = ({target}) => {
    const formData = {};
    formData[target.name] = target.value;
    this.setState({ ...formData });
  };

  onConfirm = async cb => {
    const { title, body, id } = this.state;
    await cb({
      variables: {
        title,
        body,
        id
      }
    });
    try {
      this.props.onSuccess()
      this.setState({
        title: "",
        body: ""
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { title, body } = this.state;
    const { onSubmit } = this.props;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.onConfirm(onSubmit);
        }}
      >
        <input
          type="text"
          placeholder="title"
          value={title}
          name="title"
          onChange={this.handleInput}
        />
        <textarea
          type="text"
          placeholder="body"
          value={body}
          name="body"
          onChange={this.handleInput}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
