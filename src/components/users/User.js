import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import PropTypes from "prop-types";

class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
  };

  render() {
    const { loading } = this.props;

    const {
      name,
      email,
      avatar_url,
      location,
      bio,
      login,
      blog,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
    } = this.props.user;

    if (loading) return <Spinner />;

    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Back to Search
        </Link>
        Hireable:{" "}
        {hireable ? (
          <i className='fas fa-check text-success' />
        ) : (
          <i className='fas fa-times text-danger' />
        )}
      </Fragment>
    );
  }
}

export default User;
