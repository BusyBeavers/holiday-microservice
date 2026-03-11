import express from "express";
import cors from "cors";
import holidaysData from "./holidays.json" with { type: "json" };

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

function findDateMatch(date) {
  for (const holiday of holidaysData.holidays) {
    if (holiday.date === date) {
      return holiday.name;
    }
  }

  return null;
}

app.get("/holidays", async (req, res) => {
  const date = req.query.date;
  if (!date) {
    return res
      .status(400)
      .json({ error: "'date' query parameter is required" });
  }

  const holidayMatchName = findDateMatch(date);

  return res.json({ holiday: holidayMatchName });
});
