import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./home.css";
import {ProductList} from "../../components/Layouts/products";
// import Carousel from "../../components/Layouts/carousel";

const Home = () => {
  return (
    <>

    {/* <Carousel/> */}
     <ProductList/>
    </>
  );
};

export default Home;
