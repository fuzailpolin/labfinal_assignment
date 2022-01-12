const express = require("express");
const cors = require("cors");
var InfogramAPI = require("infogram");
require("dotenv").config();

var infogram = new InfogramAPI(
  process.env.INFOGRAM_API_KEY,
  process.env.INFOGRAM_API_SECRET
);

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.get("/info", async (req, res, next) => {
  let data = [
    {
      type: "h1",
      text: "RevenueRoll",
    },
    {
      type: "h2",
      text: "Revenue Roll Improve Ad Performance",
    },
    {
      type: "chart",
      chart_type: "pie-semi-circle",
      data: [
        [
          ["Add Performance", "ROAS IMPROVEMENT"],
          ["ROAS IMPROVEMENT", 40502],
          ["Uplift from analytics", 49071],
          ["Uplift from analytics + Managed Marketing", 33967],
        ],
      ],
      colors: ["#5FB7E5", "#F0CB69", "#FD6A37"],
      settings: {
        height: 300,
        legend: true,
        callouts: {
          enabled: true,
          percentage: true,
          name: true,
        },
      },
    },
    {
      type: "h2",
      text: "Revenue Minimizes Cost Per $ of Revenue",
    },
    {
      type: "chart",
      chart_type: "column-stacked",
      data: [
        [
          ["", "Revenue", "Contractor Costs"],
          ["Status Quo", 20000, -4500],
          ["@Same ROAS", 20000, -500],
          ["@Improved ROAS", 40000, -4500],
        ],
      ],
      colors: ["#5FB7E5", "#FD6A37"],
      settings: {
        height: 300,
        legend: true,
        callouts: {
          enabled: true,
          percentage: true,
          name: true,
        },
      },
    },
    {
      type: "h2",
      text: "Maximize Your Returns By Utilizing Our Credit Product",
    },
    {
      type: "chart",
      chart_type: "column-grouped",
      data: [
        [
          ["", "No ROAS Improvement", "ROAS Improvement"],
          ["Current ROI", 38, 0],
          ["0", 90, 243],
          ["25%", 118, 318],
          ["50%", 171, 462],
          ["75%", 313, 846],
          ["100%", 1870, 5070],
          ["125%", 2163, 6163],
          ["150%", 2455, 7255],
          ["175%", 2748, 8348],
          ["200%", 3040, 9440],
        ],
      ],
      colors: ["#5FB7E5", "#FD6A37"],
      settings: {
        height: 300,
        legend: true,
        callouts: {
          enabled: false,
          percentage: true,
        },
      },
    },
  ];
  let params = {
    theme_id: 279,
    content: data,
    blur: true,
    publish: true,
    title: "RR - Calculate",
  };
  const resp = await infogram.createProject(params);
  res.json(resp);
});

app.get("/themes", async (req, res, next) => {
  const response = await infogram.getThemes();
  res.send(response);
});

app.get("/get-info/:id", async (req, res, next) => {
  const { id } = req.params;
  const response = await infogram.getProject(id);
  res.send(response);
});

app.get("/", (req, res, next) => {
  res.json("server running");
});

app.listen(port, () => {
  console.log(`Listening on ${port} port`);
});
