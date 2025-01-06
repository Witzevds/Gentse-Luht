import React, { useState, useEffect, useRef } from "react";
import ParticleCanvas from "./Particle-sketch/ParticleCanvas"; // Importeer de ParticleCanvas component
import "./Api.css";

const AQIComparison = () => {
  const [city, setCity] = useState(""); // Bewaar de naam van de stad die de gebruiker invoert
  const [data, setData] = useState({ gent: null, city: null }); // Bewaar de luchtkwaliteitsdata van Gent en de opgezochte stad
  const [error, setError] = useState(""); // Foutmelding voor stad invoer
  const [cityDataLoaded, setCityDataLoaded] = useState(false); // Houd bij of de gegevens van de opgegeven stad geladen zijn
  const typingTimeoutRef = useRef(null); // Ref voor debouncing

  const API_URL = "https://api.waqi.info/feed/";
  const TOKEN = "6d19ee57f244716fca9eb89717bee58a7c50279d";

  // Functie om luchtkwaliteitsgegevens op te halen
  const getCityAQI = async (cityName) => {
    try {
      const response = await fetch(`${API_URL}${cityName}/?token=${TOKEN}`);
      const result = await response.json();

      if (result.status === "ok") {
        return {
          aqi: result.data.aqi || 0, // Gebruik 0 als default voor geen deeltjes
          pm25: result.data.iaqi?.pm25?.v || "N/A",
          time: result.data.time?.s || "N/A",
        };
      } else {
        console.error("Error fetching data:", result.message);
        return null;
      }
    } catch (error) {
      console.error("Request failed:", error);
      return null;
    }
  };

  // Functie om de gegevens van Gent standaard te laden
  useEffect(() => {
    const loadGentData = async () => {
      const gentData = await getCityAQI("gent");
      if (gentData) {
        setData((prevData) => ({ ...prevData, gent: gentData }));
      }
    };

    loadGentData();
  }, []);

  // Functie om stadgegevens te laden zodra de gebruiker begint te typen
  const handleCityChange = (e) => {
    const input = e.target.value;
    setCity(input);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current); // Reset debouncing timer
    }

    if (input.trim() !== "") {
      typingTimeoutRef.current = setTimeout(async () => {
        const cityData = await getCityAQI(input);
        if (cityData) {
          setData((prevData) => ({
            ...prevData,
            city: cityData,
          }));
          setCityDataLoaded(true);
          setError(""); // Reset foutmelding
        } else {
          setCityDataLoaded(false);
          setError("Geen gegevens gevonden voor deze stad.");
        }
      }, 300); // Debouncing van 300ms
    } else {
      setData((prevData) => ({ ...prevData, city: null }));
      setCityDataLoaded(false);
      setError(""); // Reset foutmelding
    }
  };

  return (
    <div className="aqi-comparison">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h1>Enter a city name to compare it to Gent</h1>
        <input
          type="text"
          placeholder="Typ een stad in..."
          value={city}
          onChange={handleCityChange}
          className="city-input"
        />
        {error && <div className="error-message">{error}</div>}
      </div>

      {/* Deeltjes visualisatie en informatie */}
      <div className="particle-wrap">
        <div className="info-canvas">
          <ParticleCanvas aqi={data.gent?.aqi || 0} cityName="Gent" />
          <div style={{ marginTop: "2rem" }} className="city-info">
            <h3>Gent</h3>
            <p>
              <strong>AQI:</strong> {data.gent?.aqi || "Nog geen gegevens"}
            </p>
            <p>
              <strong>PM2.5:</strong> {data.gent?.pm25}
            </p>
            <p>
              <strong>Laatste update:</strong> {data.gent?.time}
            </p>
          </div>
        </div>

        <div className="info-canvas">
          <ParticleCanvas aqi={data.city?.aqi || 0} cityName={city || "Stad"} />
          <div style={{ marginTop: "2rem" }} className="city-info">
            <h3>{city || "stad"}</h3>
            {cityDataLoaded ? (
              <>
                <p>
                  <strong>AQI:</strong> {data.city?.aqi}
                </p>
                <p>
                  <strong>PM2.5:</strong> {data.city?.pm25}
                </p>
                <p>
                  <strong>Laatste update:</strong> {data.city?.time}
                </p>
              </>
            ) : (
              <p>Voer een stad in om de gegevens te zien.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AQIComparison;
