import React, { useState, useEffect } from "react";
import ParticleCanvas from "./Particle-sketch/ParticleCanvas"; // Importeer de ParticleCanvas component
import Chart from "chart.js/auto";
import "./Api.css";

const AQIComparison = () => {
  const [city, setCity] = useState(""); // Bewaar de naam van de stad die de gebruiker invoert
  const [data, setData] = useState({ gent: null, city: null }); // Bewaar de luchtkwaliteitsdata van Gent en de opgezochte stad
  const [chart, setChart] = useState(null); // Bewaar de Chart.js instantie
  const [cityDataLoaded, setCityDataLoaded] = useState(false); // Houd bij of de gegevens van de opgegeven stad geladen zijn

  const API_URL = "https://api.waqi.info/feed/";
  const TOKEN = "6d19ee57f244716fca9eb89717bee58a7c50279d";

  // Functie om luchtkwaliteitsgegevens op te halen
  const getCityAQI = async (cityName) => {
    try {
      const response = await fetch(`${API_URL}${cityName}/?token=${TOKEN}`);
      const result = await response.json();

      if (result.status === "ok") {
        return {
          aqi: result.data.aqi || "N/A",
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
        renderChart({ gent: gentData.aqi }); // Render alleen Gent bij initiële load
      }
    };

    loadGentData();
  }, []);

  // Functie om de gegevens van de opgegeven stad te vergelijken
  const compareCities = async () => {
    if (!city) return;

    const cityData = await getCityAQI(city);
    if (cityData) {
      setData((prevData) => ({
        ...prevData,
        city: cityData,
      }));
      setCityDataLoaded(true); // Zet de stad data geladen na het ophalen van gegevens
      renderChart({
        gent: data.gent?.aqi,
        [city]: cityData.aqi,
      });
    }
  };

  // Functie om de grafiek te renderen
  const renderChart = (chartData) => {
    const ctx = document.getElementById("aqiChart").getContext("2d");

    if (chart) {
      // Update de bestaande grafiek als die er al is
      chart.data.labels = Object.keys(chartData);
      chart.data.datasets[0].data = Object.values(chartData);
      chart.update();
    } else {
      // Maak een nieuwe grafiek
      const newChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(chartData),
          datasets: [
            {
              label: "Air Quality Index (AQI)",
              data: Object.values(chartData),
              backgroundColor: ["green", "blue"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      });
      setChart(newChart);
    }
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

      {/* Deeltjes visualisatie alleen als de stadgegevens geladen zijn */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {cityDataLoaded && (
          <>
            <ParticleCanvas aqi={data.gent?.aqi || 0} cityName="Gent" />
            <ParticleCanvas aqi={data.city?.aqi || 0} cityName={city} />
          </>
        )}
      </div>

      {/* Grafiek container */}
      <div
        style={{
          marginTop: "20px",
          width: "80%",
          maxWidth: "70vw",
          height: "60vh",
          margin: "0 auto",
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <canvas id="aqiChart"></canvas>
      </div>
    </div>
  );
};

export default AQIComparison;
