// Home.js
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import "./Home.css";
import Variables from "../Variable.json";
import { Link } from "react-router-dom";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [brands, setBrands] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [fixedDeals, setFixedDeals] = useState([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("X-TOKEN-KEY", Variables.TOKEN);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    // Fetch Banners
    fetch(Variables.baseUrl + "banners", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBanners(data);
        }
      })
      .catch((error) => console.error("Error fetching banners:", error));

    // Fetch Categories
    fetch(Variables.baseUrl + "categories", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch Auctions
    fetch(Variables.baseUrl + "assets/typeProducts/Bid", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status && Array.isArray(data.data)) {
          setAuctions(data.data);
        }
      })
      .catch((error) => console.error("Error fetching auctions:", error));

    // Fetch Brands
    fetch(Variables.baseUrl + "subCategories/2", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBrands(data);
        }
      })
      .catch((error) => console.error("Error fetching brands:", error));

    // Fetch Insurance
    fetch(Variables.baseUrl + "loan-insurance", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInsurance(data);
        }
      })
      .catch((error) => console.error("Error fetching insurance:", error));

      // Fetch FixedDeals
    fetch(Variables.baseUrl + "assets/typeProducts/Product", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.status && Array.isArray(data.data)) {
        setFixedDeals(data.data);
      }
    })
    .catch((error) => console.error("Error fetching auctions:", error));
  }, []);

  return (
    <div className="MainContainer">
      <div className="Bannercontainer">
        {banners.length > 0 ? (
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{
              clickable: true
            }}
            modules={[Autoplay, Pagination]}
            effect="flip"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.banner_id}>
                <img
                  src={banner.banner_image_url}
                  alt={`Banner ${banner.banner_id}`}
                  className="BannerImage"
                />
                {/* <Link to={banner.Button_Redirect} className="banner-button">
                  <span>{banner.Button_Text}</span>
                </Link> */}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>Loading banners...</p>
        )}
      </div>

      <h2 className="category-title">Explore Our Categories</h2>
      <div className="categories-container">
        {categories.map((category) => (
          <div key={category.c_id} className="category-card">
            <img
              src={category.c_image_url}
              alt={category.c_name}
              className="category-image"
            />
            <h3 className="category-label">{category.c_name}</h3>
          </div>
        ))}
      </div>

      <div className="auction-container">
        <h2 className="carousel-title">Popular Auctions</h2>
        <Swiper
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          modules={[Autoplay]}
          slidesPerView={window.innerWidth < 786 ? 1 : 5}
        >
          {auctions.map((auction) => (
            <SwiperSlide key={auction.a_id} className="auction-card">
              <img
                src={auction.a_image_url}
                alt={auction.a_name}
                className="auction-image"
              />
              <div className="auction-info">
                <div className="marquee">
                  <h3>{auction.a_name}</h3>
                </div>
                <div
                  className="marquee"
                  style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                >
                  <p className="auction-price">Current Bid:</p>
                  <p style={{ fontSize: 17, fontWeight: "bold", color: "#007bff" }}>
                    ⠀₹{auction.a_current_bid.toLocaleString()}
                  </p>
                </div>
                <p className="auction-location">Location: {auction.Location_name}</p>
                <div className="auction-buttons">
                  <button className="bid-button">Bid Now</button>
                  <a href="#" className="details-link">
                    Details
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="brand-section">
        <h2 className="brand-title">SEARCH AUCTIONS CARS BY BRAND</h2>
        <div className="brand-grid">
          {brands.map((brand) => (
            <div key={brand.s_c_id} className="brand-card">
              <img
                src={brand.s_c_image}
                alt={brand.s_c_name}
                className="brand-image"
              />
            </div>
          ))}
        </div>
        <div className="brand-button-container">
          <button className="brand-view-all">View All</button>
        </div>
      </div>

      <div className="insurance-section">
        <h2 className="insurance-title">Top Insurance Plans</h2>
        <div className="insurance-grid">
          {insurance.map((item) => (
            <div key={item.L_id} className="insurance-card">
              <img
                src={item.L_image_url}
                alt={item.L_name}
                className="insurance-image"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="fixedDeals-container">
        <h2 className="carousel-title">Fixed Assets</h2>
        <Swiper
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          modules={[Autoplay]}
          slidesPerView={window.innerWidth < 786 ? 1 : 5}
        >
          {fixedDeals.map((fixedDeal) => (
            <SwiperSlide key={fixedDeal.a_id} className="fixedDeals-card">
              <img
                src={fixedDeal.a_image_url}
                alt={fixedDeal.a_name}
                className="fixedDeals-image"
              />
              <div className="fixedDeals-info">
                <div className="marquee">
                  <h3>{fixedDeal.a_name}</h3>
                </div>
                <p className="fixedDeals-location">Location: {fixedDeal.Location_name}</p>
                <p style={{ fontSize: 25, fontWeight: "bold", color: "#A405CC" }}>
                    ⠀₹{fixedDeal.a_current_bid.toLocaleString()}
                  </p>
                  <div style={{height:1, width:'100%', background:'grey'}}/>
                <div className="fixedDeals-buttons">
                  <a href="#" className="fixedDealsdetails-link">
                  Book a Test Drive
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="brand-section">
        <h2 className="brand-title">SEARCH USED CARS BY BRAND</h2>
        <div className="brand-grid">
          {brands.map((brand) => (
            <div key={brand.s_c_id} className="brand-card">
              <img
                src={brand.s_c_image}
                alt={brand.s_c_name}
                className="brand-image"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="swipeAuctionsIntro">
        <img
          src="https://api.swipeauctions.org:8080/uploads/banner_images/1738239626647.png"
          alt="Swipe Auctions Banner"
          className="swipeAuctionsBanner"
        />
        <h2 className="swipeAuctionsHeading">Swipe Auctions – India’s #1 Auction Platform</h2>
        <p className="swipeAuctionsSubtext">
          Discover a seamless, transparent, and rewarding way to buy and sell across categories like 
          automobiles, electronics, fashion, gold, real estate, and more.
        </p>
        <div className="swipeAuctionsFeatures">
          <div className="featureCard">
            <h3>Save More</h3>
            <p>Bid smart, win big, and snag the best deals.</p>
          </div>
          <div className="featureCard">
            <h3>All-in-One Marketplace</h3>
            <p>From gadgets to luxury cars, find it all in one place.</p>
          </div>
          <div className="featureCard">
            <h3>Easy Selling</h3>
            <p>List effortlessly, enjoy free bids, and reach eager buyers instantly.</p>
          </div>
        </div>
        <p className="swipeAuctionsCTA">
          Join Swipe Auctions today for a smarter way to buy and sell!
        </p>
      </div>
    </div>
  );
};

export default Home;