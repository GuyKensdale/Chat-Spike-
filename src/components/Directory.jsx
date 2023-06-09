import React from "react";
import { NavLink } from "react-router-dom";

const Directory = () => {
  return (
    <nav>
      <NavLink to="/chat-1">Go To Chat 1</NavLink>
      <NavLink to="/chat-2">Go To Chat 2</NavLink>
    </nav>
  );
};

export default Directory;
