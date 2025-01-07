import React, { useState, useEffect, useRef } from "react";
import ParticleCanvas from "./Particle-sketch/ParticleCanvas";
import "./Api.css";

const AQIComparison = () => {
  const [city, setCity] = useState(""); // User-entered city
  const [data, setData] = useState({ gent: null, city: null, topCities: [] }); // AQI data for Gent, user-entered city, and top cities
  const [error, setError] = useState("");
  const [cityDataLoaded, setCityDataLoaded] = useState(false);
  const typingTimeoutRef = useRef(null);

  const API_URL = "https://api.waqi.info/feed/";
  const TOKEN = "6d19ee57f244716fca9eb89717bee58a7c50279d";

  // List of cities to compare
  const cityList = [
    "gent",
    "amsterdam",
    "paris",
    "berlin",
    "london",
    "new york",
    "tokyo",
    "sydney",
    "beijing",
    "mumbai",
    "cairo",
    "moscow",
  ];

  // Fetch AQI data for a single city
  const getCityAQI = async (cityName) => {
    try {
      const response = await fetch(`${API_URL}${cityName}/?token=${TOKEN}`);
      const result = await response.json();

      if (result.status === "ok") {
        return {
          city: cityName,
          aqi: result.data.aqi || 999, // Use 999 for unavailable data
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

  // Load default data for Gent and top cities
  useEffect(() => {
    const loadInitialData = async () => {
      const gentData = await getCityAQI("gent");
      if (gentData) {
        setData((prevData) => ({ ...prevData, gent: gentData }));
      }

      const cityDataPromises = cityList.map((city) => getCityAQI(city));
      const allCityData = await Promise.all(cityDataPromises);
      const validCities = allCityData.filter(
        (city) => city && city.aqi !== 999
      );

      // Sort cities by AQI and update state
      const sortedCities = validCities.sort((a, b) => a.aqi - b.aqi);
      setData((prevData) => ({
        ...prevData,
        topCities: sortedCities.slice(0, 10),
      }));
    };

    loadInitialData();
  }, []);

  // Load data for user-input city
  const handleCityChange = (e) => {
    const input = e.target.value;
    setCity(input);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
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
          setError("");
        } else {
          setCityDataLoaded(false);
          setError("Geen gegevens gevonden voor deze stad.");
        }
      }, 300);
    } else {
      setData((prevData) => ({ ...prevData, city: null }));
      setCityDataLoaded(false);
      setError("");
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
        <h1>Compare Air Quality</h1>
        <input
          type="text"
          placeholder="Enter a city..."
          value={city}
          onChange={handleCityChange}
          className="city-input"
        />
        {error && <div className="error-message">{error}</div>}
      </div>

      {/* Particle visualization and information */}
      <div className="particle-wrap">
        <div className="info-canvas">
          <ParticleCanvas aqi={data.gent?.aqi || 0} cityName="Gent" />
          <div style={{ marginTop: "2rem" }} className="city-info">
            <h3>Gent</h3>
            <p>
              <strong>AQI:</strong> {data.gent?.aqi || "No data available"}
            </p>
            <p>
              <strong>PM2.5:</strong> {data.gent?.pm25}
            </p>
            <p>
              <strong>Last Update:</strong> {data.gent?.time}
            </p>
          </div>
        </div>

        <div className="info-canvas">
          <ParticleCanvas aqi={data.city?.aqi || 0} cityName={city || "City"} />
          <div style={{ marginTop: "2rem" }} className="city-info">
            <h3>{city || "City"}</h3>
            {cityDataLoaded ? (
              <>
                <p>
                  <strong>AQI:</strong> {data.city?.aqi}
                </p>
                <p>
                  <strong>PM2.5:</strong> {data.city?.pm25}
                </p>
                <p>
                  <strong>Last Update:</strong> {data.city?.time}
                </p>
              </>
            ) : (
              <p>Enter a city to see its data.</p>
            )}
          </div>
        </div>
      </div>

      {/* Top 10 Cities Section */}
      <div className="top-10-cities">
        <h2>Top 10 Cleanest Cities</h2>
        <ul>
          {data.topCities.map((city, index) => (
            <li key={index}>
              <strong>{city.city}</strong> - AQI: {city.aqi}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AQIComparison;
