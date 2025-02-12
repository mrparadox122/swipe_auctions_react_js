import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./Home.css";
import Variables from "../Variable.json";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("X-TOKEN-KEY", Variables.TOKEN);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(Variables.baseUrl + "banners", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBanners(data);
        } else {
          console.error("Invalid banner data:", data);
        }
      })
      .catch((error) => console.error("Error fetching banners:", error));

    fetch(Variables.baseUrl + "categories", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Invalid category data:", data);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
      
    fetch(Variables.baseUrl + "assets/typeProducts/Bid", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status && Array.isArray(data.data)) {
          setAuctions(data.data);
        } else {
          console.error("Invalid auction data:", data);
        }
      })
      .catch((error) => console.error("Error fetching auctions:", error));
  }, []);

  return (
    <div>
      <div className="Bannercontainer">
        {banners.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={1}
            slidesPerView={1}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            loop={true}
            autoplay={{ delay: 3000 }}
          >
            {banners.map((banner) => (
              <SwiperSlide
                key={banner.banner_id}
                onClick={() => console.log("click" + banner.banner_id)}
              >
                <img
                  src={banner.banner_image_url}
                  alt={`Banner ${banner.banner_id}`}
                  className="BannerImage"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>Loading banners...</p>
        )}
      </div>
      <h2 className="category-title">Explore Your Categories</h2>
      <div className="categories-container">
        {categories.map((category) => (
          <div key={category.c_id} className="category-card">
            <img
              src={category.c_image_url}
              alt={category.c_name}
              className="category-image"
            />
            <div className="category-label">{category.c_name}</div>
          </div>
        ))}
      </div>

      <div className="auction-container">
        <h2 className="carousel-title">Popular Auctions</h2>
        <Swiper
          loop={true}
          autoplay={{ delay: 3000 }}
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
            <div className="marquee">
              <p className="auction-price">Current Bid: ${auction.a_current_bid.toLocaleString()}</p>
              </div>
              <p className="auction-location">Location: {auction.Location_name}</p>
              <div className="auction-buttons">
                <button className="bid-button">Bid Now</button>
                <a href="#" className="details-link">Details</a>
              </div>
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;