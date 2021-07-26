import React from "react";
import { getUser, resetUserSession } from "./service/AuthService";

const Content = (props) => {
  const user = getUser();
  const name = user !== "undefined" && user ? user.name : "";

  const logoutHandler = () => {
    resetUserSession();
    props.history.push("./login");
  };

  return (
    <div>
      Hello {name}!, you are in logged into the secret content page.<br></br>
      <input type="button" value="logout" onClick={logoutHandler}></input>
    </div>
  );
};

export default Content;
