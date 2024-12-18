import React, { useRef, useEffect } from "react";
import p5 from "p5";
import image from "/Variables/Assets/city.jpg"; // Importeer de afbeelding
import "./Particle-canvas.css"; // Importeer je CSS-bestand

const ParticleCanvas = ({ aqi, cityName }) => {
  const canvasRef = useRef(null); // Ref voor het canvas element

  useEffect(() => {
    const sketch = (p) => {
      let particles = [];
      let cityImg;

      p.preload = () => {
        cityImg = p.loadImage(image); // Laad de afbeelding
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth / 2, 300); // Creëer canvas met breedte van de helft van het scherm en vaste hoogte
        p.imageMode(p.CENTER); // Zet de afbeeldingmodus naar CENTER

        // Maak de deeltjes aan op basis van de AQI waarde
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

        // Schaal de afbeelding zodat deze het volledige canvas vult
        p.image(
          cityImg,
          p.width / 2,
          p.height / 2,
          p.width, // De afbeelding moet de volledige breedte van het canvas bedekken
          p.height // De afbeelding moet de volledige hoogte van het canvas bedekken
        );

        // Update en teken alle deeltjes
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].show();
        }
      };

      class Particle {
        constructor(x, y, speed, size) {
          this.pos = p.createVector(x, y);
          this.vel = p.createVector(
            p.random(-speed, speed),
            p.random(-speed, speed)
          );
          this.acc = p.createVector(0, 0);
          this.size = size;
        }

        update() {
          this.vel.add(this.acc);
          this.pos.add(this.vel);

          // Zorg ervoor dat de deeltjes terugkomen aan de andere kant als ze buiten het canvas gaan
          if (this.pos.x < 0) {
            this.pos.x = p.width; // Terug aan de rechterkant
          } else if (this.pos.x > p.width) {
            this.pos.x = 0; // Terug aan de linkerkant
          }

          if (this.pos.y < 0) {
            this.pos.y = p.height; // Terug aan de onderkant
          } else if (this.pos.y > p.height) {
            this.pos.y = 0; // Terug aan de bovenkant
          }

          this.acc.mult(0); // Reset de versnelling
        }

        show() {
          p.noStroke();
          p.fill(0, 0, 0, 100); // Zwarte deeltjes met wat transparantie
          p.ellipse(this.pos.x, this.pos.y, this.size, this.size);
        }
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth / 2, 300); // Pas de canvasgrootte aan bij het wijzigen van het venster
      };
    };

    // Start de p5.js sketch
    const myP5 = new p5(sketch, canvasRef.current);

    // Schoonmaakfunctie om de p5 sketch te verwijderen bij het verlaten van de component
    return () => myP5.remove();
  }, [aqi, cityName]); // Herlaad de sketch bij verandering van AQI of stad

  const containerStyle = {
    display: "flex",
    flexDirection: "column", // Zet de elementen onder elkaar
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    width: "100%",
    maxWidth: "800px", // Pas aan afhankelijk van de gewenste breedte
    height: "350px", // De hoogte van het canvas inclusief de tekst bovenaan
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const cityNameStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px", // Voeg wat ruimte toe tussen de naam en het canvas
    color: "#333", // Pas de kleur aan naar wens
  };

  const canvasStyle = {
    width: "100%", // Zorg ervoor dat het canvas de volledige breedte vult
    height: "100%", // Zorg ervoor dat het canvas de volledige hoogte vult
  };

  return (
    <div style={containerStyle}>
      <div style={cityNameStyle}>{`Luchtkwaliteit in ${cityName}`}</div>
      <div ref={canvasRef} style={canvasStyle}></div>
    </div>
  );
};

export default ParticleCanvas;
