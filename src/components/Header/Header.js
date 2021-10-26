import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

// Icons
import { Search } from "@mui/icons-material";

// CSS
import "./style.css";

function Header() {
  const [searchValue, setSearchValue] = useState("");

  const isAuthorized = useSelector((state) => state.isAuthorized);

  const history = useHistory();

  function linkToHome() {
    history.push("/");
  }

  function linkToSearch(e) {
    e.preventDefault();
    history.push(`/search?s=${searchValue}`);
  }

  return (
    <header className="header-wrapper">
      <div className="logo-wrapper" onClick={linkToHome}>
        <img className="image-wrapper" src="./logo.png" alt="logo" />
        <div className="title-logo">GIFHome</div>
      </div>
      <div className="category-element">Category 1</div>
      <div className="category-element">Category 2</div>
      <div className="category-element">Category 3</div>
      <div className="category-element">Category 4</div>
      <form className="search-wrapper" onSubmit={linkToSearch}>
        <Search />
        <input
          className="search-input"
          type="text"
          name="search"
          id="search"
          value={searchValue}
          placeholder="Search for any gif you want..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
      <div className="login-information-header">
        {isAuthorized.isAuthorized ? (
          <></>
        ) : (
          <>
            <div>Log In</div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
