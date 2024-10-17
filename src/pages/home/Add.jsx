import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Add = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // Medium devices (tablets, iPads)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // Small devices (landscape phones)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Extra small devices (portrait phones)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="add">
        <div className="container mx-auto mt-10 px-4 sm:px-0">
          <Slider {...settings}>
            {coment.map((d) => (
              <div className=" p-6 sm:w-full md:w-full
              " key={d.id}>
                <div className="flex justify-center mb-4">
                  <h2 className="text-3xl font-bold"></h2>
                </div>
                <div className="flex justify-center">
                  <Link to="/product">
                    <img src={d.img} alt="Product" className="w-full rounded-md" />
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

const coment = [
  { id: 1, img: "./img/slid1.png" },
  { id: 2, img: "./img/slid2.png" },
  { id: 3, img: "./img/slid3.png" },
  { id: 4, img: "./img/slid4.png" },
  { id: 5, img: "./img/slid5.png" },
  { id: 6, img: "./img/slid6.png" },
  { id: 7, img: "./img/slid7.png" },
  { id: 8, img: "./img/slid8.png" },
  { id: 9, img: "./img/slid9.png" },
];

export default Add;
