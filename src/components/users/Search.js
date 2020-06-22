import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GithubContext from "../../context/github/githubContext";

const Search = ({ showAlert }) => {
  const githubContext = useContext(GithubContext);
  const { searchUsers, clearUsers, users } = githubContext;

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      showAlert("Please enter something", "light");
    } else {
      searchUsers(text);
      setText("");
    }
  };

  const handleChange = (e) => setText(e.target.value);

  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={handleChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>

      {users.length > 0 && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  showAlert: PropTypes.func.isRequired,
};

export default Search;
