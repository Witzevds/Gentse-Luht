import React from "react";
import "aframe";
import "./Hero-main.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__text">
        <h2 className="hero__text--title">Gentse Luht</h2>
        <p className="hero__text--info">
          If you can breathe it, <br /> Gent Can bottle it.
        </p>
      </div>
      <div className="hero__display">
        <a-scene embedded>
          <a-light type="directional" intensity="1" position="2 0 0"></a-light>
          <a-light type="ambient" intensity="0.5"></a-light>
          <a-camera position="-2 2 0"></a-camera>

          {/* 3D-model met textuur */}
          <a-entity
            gltf-model="url(/Variables/Assets/bottle-3D.glb)"
            position="0 2 -3"
            scale="0.3 0.3 0.3"
            rotation="0 15 90"
            material="src: url(/Variables/Assets/bottle-hero-display.png);"
          ></a-entity>
        </a-scene>
      </div>
    </section>
  );
};

export default Hero;
