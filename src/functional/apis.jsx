import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import "./Api.css";

const AQIComparison = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState({ gent: null, city: null });
  const [chart, setChart] = useState(null);

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

      {/* Vergelijkingstabel */}
      <div>
        {data.gent && data.city && (
          <div>
            <ul>
              <div className="city">
                <p
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  Stad
                </p>
                <li
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  Gent
                </li>
                <li
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {city}
                </li>
              </div>
              <div className="aqi">
                <p
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  AQI
                </p>
                <li
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {data.gent?.aqi}
                </li>
                <li
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  {data.city?.aqi}
                </li>
              </div>
              <div className="pm25">
                <p
                  style={{
                    padding: "10px",
                  }}
                >
                  PM2.5 (μg/m³)
                </p>
                <li
                  style={{
                    padding: "10px",
                  }}
                >
                  {data.gent?.pm25}
                </li>
                <li
                  style={{
                    padding: "10px",
                  }}
                >
                  {data.city?.pm25}
                </li>
              </div>
              <div className="date">
                <p
                  style={{
                    padding: "10px",
                  }}
                >
                  Laatste meting
                </p>
                <li
                  style={{
                    padding: "10px",
                  }}
                >
                  {data.gent?.time}
                </li>
                <li
                  style={{
                    padding: "10px",
                  }}
                >
                  {data.city?.time}
                </li>
              </div>
            </ul>
          </div>
        )}
      </div>

      {/* Uitleg */}
      <div style={{ marginTop: "20px", textAlign: "left", padding: "20px" }}>
        <h3>Wat betekenen deze cijfers?</h3>
        <ul>
          <li>
            <strong>AQI (Air Quality Index):</strong> Dit geeft de algehele
            luchtkwaliteit weer. Lager is beter. Een waarde boven 100 is
            schadelijk voor gevoelige groepen.
          </li>
          <li>
            <strong>PM2.5:</strong> Dit meet fijne stofdeeltjes die gevaarlijk
            kunnen zijn voor de gezondheid. Een waarde onder 50 is ideaal.
          </li>
          <li>
            <strong>Laatste meting:</strong> Dit is het tijdstip waarop de
            luchtkwaliteitsgegevens zijn verzameld.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AQIComparison;
