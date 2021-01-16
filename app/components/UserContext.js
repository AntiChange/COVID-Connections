import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const Context = createContext({});

export const Provider = props => {
  // Initial values are obtained from the props
  const {
    user: initialUser,
    children
  } = props;

  // Use State to keep the values
  const [user, setUser] = useState(initialUser);

  // Make the context object:
  const usersContext = {
    user,
    setUser
  };

  // pass the value in provider and return
  return <Context.Provider value={userContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propTypes = {
  users: PropTypes.array,
  selectedUser: PropTypes.object
};

Provider.defaultProps = {
  user: null
};