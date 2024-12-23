import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Card, CardContent, Typography, Grid, TextField, MenuItem } from "@mui/material";
import './Dashboard.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  // États pour les données du formulaire
  const [formData, setFormData] = useState({
    electricity: 100, // kWh par mois
    transportation: 7, // Gallons de carburant
    shortFlights: 1,
    mediumFlights: 0,
    longFlights: 0,
    dietaryChoice: "Vegan",
  });

  // Calcul des émissions de CO2
  const calculateEmissions = () => {
    const electricityEmission = formData.electricity * 4; // Approximativement 4 kgCO2 par kWh
    const transportationEmission = formData.transportation * 8.89; // 8.89 kgCO2 par gallon
    const flightEmission =
      formData.shortFlights * 100 +
      formData.mediumFlights * 300 +
      formData.longFlights * 800; // Approximation des vols
    const dietaryEmission =
      formData.dietaryChoice === "Vegan"
        ? 0
        : formData.dietaryChoice === "Vegetarian"
        ? 200
        : 500; // Estimations alimentaires

    return {
      electricity: electricityEmission,
      transportation: transportationEmission,
      airTravel: flightEmission,
      dietaryChoice: dietaryEmission,
      total:
        electricityEmission +
        transportationEmission +
        flightEmission +
        dietaryEmission,
    };
  };

  const emissions = calculateEmissions();

  // Mise à jour des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "dietaryChoice" ? value : parseFloat(value) || 0,
    });
  };

  // Données du graphique
  const data = {
    labels: ["Electricity", "Transportation", "Air Travel", "Dietary Choice"],
    datasets: [
      {
        label: "CO2 Emissions (kgCO2/year)",
        data: [
          emissions.electricity,
          emissions.transportation,
          emissions.airTravel,
          emissions.dietaryChoice,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "CO2 Emissions (kgCO2/year)",
        },
      },
    },
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <section className="dashboard-page">
        <Typography variant="h4" align="center" gutterBottom>
          KPI Dashboard
        </Typography>
        <div className="table-container">
          <table className="kpi-table">
            <thead>
              <tr>
                <th>KPI</th>
                <th>Formule</th>
                <th>Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Émissions directes de CO₂</td>
                <td>Émissions de CO₂ = Quantité de combustible × Facteur d’émission du combustible</td>
                <td>
                  Si une usine brûle 5000 m³ de gaz naturel avec un facteur d'émission de 1,9 kg CO₂/m³ :<br />
                  5000 × 1,9 = 9500 kg CO₂ = 9,5 tonnes CO₂
                </td>
              </tr>
              <tr>
                <td>Intensité des émissions de GES</td>
                <td>
                  Intensité des émissions = Émissions de GES (en tonnes) / Volume de production (en unités ou kg)
                </td>
                <td>
                  Si l'entreprise produit 100000 unités avec 10 tonnes de CO₂ :<br />
                  10 / 100000 = 0,0001 tonnes CO₂ par unité
                </td>
              </tr>
              <tr>
                <td>Taux de réduction des émissions</td>
                <td>
                  Taux de réduction = ((Émissions précédentes − Émissions actuelles) / Émissions précédentes) × 100
                </td>
                <td>
                  Si les émissions passent de 100 à 80 tonnes :<br />
                  ((100 − 80) / 100) × 100 = 20%
                </td>
              </tr>
              <tr>
                <td>Consommation d'énergie par unité</td>
                <td>
                  Consommation par unité = Énergie totale consommée (en kWh) / Volume de production (en unités ou kg)
                </td>
                <td>
                  Si une usine consomme 10000 kWh pour 100000 unités :<br />
                  10000 / 100000 = 0,1 kWh par unité
                </td>
              </tr>
              <tr>
                <td>Taux d’énergie renouvelable</td>
                <td>
                  Taux d’énergie renouvelable = (Énergie renouvelable utilisée / Énergie totale utilisée) × 100
                </td>
                <td>
                  Si 3000 kWh sur 10000 kWh proviennent de sources renouvelables :<br />
                  (3000 / 10000) × 100 = 30%
                </td>
              </tr>
              <tr>
                <td>Émissions par employé</td>
                <td>
                  Émissions par employé = Émissions de GES totales (en tonnes) / Nombre d’employés
                </td>
                <td>
                  Si 500 tonnes de CO₂ sont émises pour 200 employés :<br />
                  500 / 200 = 2,5 tonnes CO₂ par employé
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: "40px" }}>
        Carbon Footprint Calculator
      </Typography>
      <Grid container spacing={3}>
        {/* Partie gauche : Formulaire */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Input Data
              </Typography>
              <form>
                <TextField
                  label="Electricity Usage (kWh/Month)"
                  name="electricity"
                  value={formData.electricity}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  label="Transportation Gasoline Usage (Gallons/Month)"
                  name="transportation"
                  value={formData.transportation}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  label="Short Flights (per year)"
                  name="shortFlights"
                  value={formData.shortFlights}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  label="Medium Flights (per year)"
                  name="mediumFlights"
                  value={formData.mediumFlights}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  label="Long Flights (per year)"
                  name="longFlights"
                  value={formData.longFlights}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  select
                  label="Dietary Choice"
                  name="dietaryChoice"
                  value={formData.dietaryChoice}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="Vegan">Vegan</MenuItem>
                  <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="Omnivorous">Omnivorous</MenuItem>
                </TextField>
              </form>
            </CardContent>
          </Card>
        </Grid>


        {/* Partie droite : Graphique et statistiques */}
        <Grid item xs={12} md={8}>
          <Card style={{ height: "100%" }} elevation={3}>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Yearly Emissions Statistics
              </Typography>
              <Bar data={data} options={options} />
              <Typography
                variant="h5"
                align="center"
                style={{ marginTop: "20px", fontWeight: "bold" }}
              >
                Total Emissions: {emissions.total.toFixed(2)} kgCO2/year
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};


export default Dashboard;



