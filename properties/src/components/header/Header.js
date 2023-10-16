import React from "react";
import "./header.scss";

const Header = () => {
  return (
    <div className="headerWrapper">
      <div className="header">

        <a className="title" href="/">
          100Acres
        </a>
      
          <input type="text" placeholder="Search your dream property" className="inputwrap" >
          </input>
      
        <div display="flex" gap={8}>
          <a href="#" className="navTab">
            For Buyers
          </a>
          <a href="#" className="navTab">
            For Tenants
          </a>
          <a href="#" className="navTab">
            For Owners
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
