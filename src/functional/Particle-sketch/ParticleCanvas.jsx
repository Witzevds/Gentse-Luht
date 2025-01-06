import React, { useRef, useEffect } from "react";
import p5 from "p5";
import cityImage from "/Variables/Assets/city.jpg"; // Updated path for the image
import "./Particle-canvas.css";

const ParticleCanvas = ({ aqi, cityName }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let particles = [];
      let cityImg;

      p.preload = () => {
        cityImg = p.loadImage(cityImage);
      };

      p.setup = () => {
        const container = canvasRef.current.parentElement;
        p.createCanvas(container.offsetWidth, container.offsetHeight);
        p.imageMode(p.CENTER);

        for (let i = 0; i < aqi; i++) {
          particles.push(
            new Particle(
              p.random(p.width),
              p.random(p.height),
              p.random(2, 5),
              10
            )
          );
        }
      };

      p.draw = () => {
        p.background(255);
        p.image(cityImg, p.width / 2, p.height / 2, p.width, p.height);

        for (const particle of particles) {
          particle.update();
          particle.show();
        }
      };

      class Particle {
        constructor(x, y, speed, size) {
          this.pos = p.createVector(x, y);
          this.vel = p.createVector(
            p.random(-speed, speed),
            p.random(-speed, speed)
          );
          this.size = size;
        }

        update() {
          this.pos.add(this.vel);

          if (this.pos.x < 0) this.pos.x = p.width;
          else if (this.pos.x > p.width) this.pos.x = 0;

          if (this.pos.y < 0) this.pos.y = p.height;
          else if (this.pos.y > p.height) this.pos.y = 0;
        }

        show() {
          p.noStroke();
          p.fill(50, 50, 50, 150);
          p.circle(this.pos.x, this.pos.y, this.size);
        }
      }

      p.windowResized = () => {
        const container = canvasRef.current.parentElement;
        p.resizeCanvas(container.offsetWidth, container.offsetHeight);
      };
    };

    const myP5 = new p5(sketch, canvasRef.current);
    return () => myP5.remove();
  }, [aqi]);

  return (
    <div className="particle-container">
      <div className="particle-container__city-name">{`Air Quality in ${cityName}`}</div>
      <div className="particle-container__canvas" ref={canvasRef}></div>
    </div>
  );
};

export default ParticleCanvas;
