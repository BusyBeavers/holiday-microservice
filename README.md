# Holiday Microservice

Given a date in YYYY-MM-DD format, obtain the name of that day's holiday if one exists. Alternatively, obtain the upcoming holidays in the given month that occur after the provided date's day.

## How to call

Obtain holiday name: https://holiday-microservice.onrender.com/holiday?date=12-25
Obtain upcoming holiday names: https://holiday-microservice.onrender.com/holiday/upcoming?date=12-03

### Example 1:

GET https://holiday-microservice.onrender.com/holiday?date=12-25

**Response 1**

```json
{
  "holiday": "Christmas Day"
}
```

### Example 2:

GET https://holiday-microservice.onrender.com/holiday/upcoming?date=12-03

**Response 2**

```json
{
  "upcomingHolidays": ["Christmas Eve", "Christmas Day", "New Year's Eve"]
}
```
