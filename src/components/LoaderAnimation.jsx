// import { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import travelAnimation from '../assets/Json/travel-animation.json';

const LoaderAnimation = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#fff", // Or use theme background
    }}>
      <Lottie
        animationData={travelAnimation}
        loop={true}
        style={{ height: 400, width: 300 }}
      />
    </div>
  )
}

export default LoaderAnimation;
