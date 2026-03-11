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
  //Extract only MM-DD from YYYY-MM-DD
  const queryMonthDay = date.slice(5);

  for (const holiday of holidaysData.holidays) {
    const holidayMonthDay = holiday.date.slice(5);
    if (holidayMonthDay === queryMonthDay) {
      return holiday.name;
    }
  }

  return null;
}

app.get("/holiday", async (req, res) => {
  const date = req.query.date;
  if (!date) {
    return res
      .status(400)
      .json({ error: "'date' query parameter is required" });
  }

  const holidayMatchName = findDateMatch(date);

  return res.json({ holiday: holidayMatchName });
});
