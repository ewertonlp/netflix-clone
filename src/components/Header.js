/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./Header.css";

export default ({bgdark}) => {
  return (
    <header className={bgdark ? 'bgdark' : ''}>
      <div className="header--logo">
        <a href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png?20190206123158" alt="Logo" />
        </a>
      </div>
      <div className="header--user">
          <a href="/">
          <img src="https://img.icons8.com/fluency/344/user-male-circle.png" alt="" />
          </a>
      </div>
    </header>
  )
};
