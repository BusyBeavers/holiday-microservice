import express from "express";
import cors from "cors";
import holidaysData from "./holidays.json" with { type: "json" };

const PORT = process.env.PORT || 5002;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

function getDateMatch(date) {
  for (const holiday of holidaysData.holidays) {
    if (holiday.date === date) {
      return holiday.name;
    }
  }

  return null;
}

function getUpcomingHolidays(inputDate) {
  let upcomingHolidays = [];
  let inputMonth = inputDate.split("-")[0];
  let inputDay = inputDate.split("-")[1];

  for (const holiday of holidaysData.holidays) {
    let holidayMonth = holiday.date.split("-")[0];
    let holidayDay = holiday.date.split("-")[1];

    //convert 'MM' string to integer for comparisons with '+' prefix
    if (inputMonth == holidayMonth && +inputDay <= +holidayDay) {
      upcomingHolidays.push(holiday.name);
    }
  }

  return upcomingHolidays;
}

app.get("/holiday", async (req, res) => {
  const date = req.query.date;
  if (!date) {
    return res
      .status(400)
      .json({ error: "'date' query parameter is required" });
  }

  const holidayMatchName = getDateMatch(date);

  return res.json({ holiday: holidayMatchName });
});

app.get("/holiday/upcoming", async (req, res) => {
  const date = req.query.date;
  if (!date) {
    return res
      .status(400)
      .json({ error: "'date' query parameter is required" });
  }

  const upcomingHolidays = getUpcomingHolidays(date);

  return res.json({ upcomingHolidays });
});
