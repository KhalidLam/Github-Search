import React, { Component } from "react";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layouts/Alert";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  // Search Github Users
  searchUsers = async (text) => {
    this.setState({ loading: true });

    const resp = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: resp.data.items, loading: false });
  };

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { loading, users, alert } = this.state;
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            setAlert={this.setAlert}
            showClear={users.length > 0 ? true : false}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;

// async componentDidMount() {
//   this.setState({ loading: true });

//   const resp = await axios.get(
//     `https://api.github.com/users?client_id=
//     ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
//     ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
//   );

//   this.setState({ users: resp.data, loading: false });
// }

//  {alert && (
//      <button className='btn btn-light btn-block'>{alert.msg}</button>
//  )}
