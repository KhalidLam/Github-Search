import React, { Component } from "react";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {
    // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    this.setState({ loading: true });

    const resp = await axios.get(
      `https://api.github.com/users?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: resp.data, loading: false });
  }

  render() {
    const { loading, users } = this.state;
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
