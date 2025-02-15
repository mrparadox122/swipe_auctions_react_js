import React, { useContext, useEffect, useState } from "react";
import { FiPhoneCall, FiHome, FiShoppingCart, FiTag, FiUsers, FiUser } from "react-icons/fi";
import { UserContext } from "../Controllers/UserContext";
import Variables from "../Variable.json";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const { userData, setUserData, metaData, setMetaData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeta();
  }, []);

  const fetchMeta = () => {
    const myHeaders = new Headers();
    myHeaders.append("X-TOKEN-KEY", Variables.TOKEN);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    fetch(Variables.baseUrl + "meta", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setMetaData(result);
          setLoading(false);
        } else {
          console.error("Error In Meta");
        }
      })
      .catch((error) => console.error(error));
  };

  const getMetaValue = (type) => {
    const meta = metaData.find((item) => item.meta_type === type);
    return meta ? meta.meta_data : "";
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <header>
      <div className="container">
        <div className="logoContainer">
          <img src={getMetaValue("logo")} alt={getMetaValue("name")} className="logo" />
          <span className="logoText">{getMetaValue("name")}</span>
        </div>
        <input
          type="text"
          placeholder="NEW AI Search! enter Make, Model Damage, Color, Vin and more"
          className="searchBar"
        />
        <div className="actionsContainer">
          <button className="requestCallbackButton">
            <FiPhoneCall className="phoneIcon" /> Request a callback
          </button>
          <button className="authButton">Sign Up</button>
          <button className="authButton">Log In</button>
        </div>
      </div>

      <nav className="navContainer">
        <ul className="navBar">
          <li>
            <Link to="/" className="navLink">
              <FiHome /> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/Auctions" className="navLink">
              <FiShoppingCart /> <span>Auctions</span>
            </Link>
          </li>
          <li>
            <Link to="/FixedDeals" className="navLink">
              <FiTag /> <span>Fixed Deals</span>
            </Link>
          </li>
          <li>
            <Link to="/DealersList" className="navLink">
              <FiUsers /> <span>Dealers</span>
            </Link>
          </li>
          <li>
            <Link to="/Profile" className="navLink">
              <FiUser /> <span>Profile</span>
            </Link>
          </li>
        </ul>
        <div className="nav-buttons">
            <button className="helpButton">Help Center</button>
            <button className="sellCarButton">Inventory</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;