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
          <a-light
            type="directional"
            intensity="1"
            position="0 20 10"
          ></a-light>
          <a-light type="ambient" intensity="0.5"></a-light>

          {/* Camera with orbit-controls */}
          <a-camera
            position="0 3 10"
            fov="50"
            orbit-controls="target: 0 2 -2; enableDamping: true; maxDistance: 15; minDistance: 5;"
          ></a-camera>

          {/* 3D-model with infinite rolling animation */}
          <a-entity
            gltf-model="url(/Variables/Assets/new-3D-bottle.glb)"
            position="0 3 0"
            scale="1 1 1"
            rotation="90 0 0"
            material="src: url(/Variables/Assets/bottle-hero-display.png);"
            animation="property: rotation; to: 90 360 0; loop: true; dur: 5000;"
          ></a-entity>
        </a-scene>
      </div>
    </section>
  );
};

export default Hero;
