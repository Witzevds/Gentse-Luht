import React, { useState } from "react";
import Chart from "chart.js/auto";

const AQIComparison = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  const API_URL = "https://api.waqi.info/feed/";
  const TOKEN = "6d19ee57f244716fca9eb89717bee58a7c50279d"; // Vervang door je eigen token

  // Functie om luchtkwaliteitsgegevens op te halen
  const getCityAQI = async (cityName) => {
    try {
      const response = await fetch(`${API_URL}${cityName}/?token=${TOKEN}`);
      const result = await response.json();

      if (result.status === "ok") {
        return result.data;
      } else {
        console.error("Error fetching data:", result.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  // Functie om gegevens te vergelijken
  const compareCities = async () => {
    const cityData = await getCityAQI(city);
    const gentData = await getCityAQI("gent");

    if (cityData && gentData) {
      setData({
        [city]: cityData.aqi,
        gent: gentData.aqi,
      });

      renderChart({
        [city]: cityData.aqi,
        gent: gentData.aqi,
      });
    }
  };

  // Functie om de grafiek te renderen
  const renderChart = (chartData) => {
    const ctx = document.getElementById("aqiChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(chartData),
        datasets: [
          {
            label: "Air Quality Index (AQI)",
            data: Object.values(chartData),
            backgroundColor: ["blue", "green"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Vergelijk luchtkwaliteit</h1>
      <input
        type="text"
        placeholder="Voer een stad in..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={compareCities}>Vergelijk met Gent</button>

      {/* Toon grafiek */}
      {data && (
        <div style={{ marginTop: "20px" }}>
          <canvas id="aqiChart" width="400" height="200"></canvas>
          <p>
            AQI van <strong>{city}</strong>: {data[city]}
          </p>
          <p>
            AQI van <strong>Gent</strong>: {data.gent}
          </p>
        </div>
      )}
    </div>
  );
};

export default AQIComparison;
