const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const fs = require("fs");
const express = require("express");

const app = express();
const port = 3000;

// Konfigurasi ukuran gambar
const width = 800;
const height = 600;

// Inisialisasi ChartJSNodeCanvas
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

// Data jumlah penduduk pria dan wanita tahun 2024
const data = {
  labels: ["Pria", "Wanita"],
  datasets: [
    {
      label: "Total Penduduk Indonesia 2024",
      data: [140000000, 135000000], // Contoh data: 140 juta pria, 135 juta wanita
      backgroundColor: ["blue", "pink"],
    },
  ],
};

// Konfigurasi chart
const configuration = {
  type: "bar",
  data: data,
  options: {
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: "Total Penduduk Indonesia 2024 (Pria vs Wanita)",
        font: { size: 20 },
      },
    },
  },
};

// Fungsi untuk menghasilkan grafik dan menyimpannya
async function generateChart() {
  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  fs.writeFileSync("population_chart.png", image);
  console.log("Graph was successfully to saved as population_chart.png");
}

// Jalankan fungsi pembuatan grafik
generateChart();

// Menyediakan gambar melalui server Express
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.send(
    '<h1>Grafik Penduduk Indonesia 2024</h1><img src="population_chart.png" alt="Grafik Penduduk">'
  );
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
