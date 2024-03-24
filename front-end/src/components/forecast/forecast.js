import React, { useMemo } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const renderWeatherDetails = (item) => (
  <div className="daily-details-grid">
    <div className="daily-details-grid-item">
      <label>Pressure:</label>
      <label>{item.main.pressure}hPa</label>
    </div>
    <div className="daily-details-grid-item">
      <label>Humidity:</label>
      <label>{item.main.humidity}%</label>
    </div>
    <div className="daily-details-grid-item">
      <label>Clouds:</label>
      <label>{item.clouds.all}%</label>
    </div>
    <div className="daily-details-grid-item">
      <label>Wind speed:</label>
      <label>{item.wind.speed} m/s</label>
    </div>
    <div className="daily-details-grid-item">
      <label>Sea level:</label>
      <label>{item.main.sea_level}m</label>
    </div>
    <div className="daily-details-grid-item">
      <label>Feels like:</label>
      <label>{item.main.feels_like}°C</label>
    </div>
  </div>
);

const ForecastDay = React.memo(({ day, item }) => (
  <AccordionItem>
    <AccordionItemHeading>
      <AccordionItemButton>
        <div className="daily-item">
          <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
          <label className="day">{day}</label>
          <label className="description">{item.weather[0].description}</label>
          <label className="min-max">{Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C</label>
        </div>
      </AccordionItemButton>
    </AccordionItemHeading>
    <AccordionItemPanel>
      {renderWeatherDetails(item)}
    </AccordionItemPanel>
  </AccordionItem>
));

const Forecast = ({ data }) => {
  const forecastDays = useMemo(() => {
    const dayInAWeek = new Date().getDay();
    return [...WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length), ...WEEK_DAYS.slice(0, dayInAWeek)];
  }, []);

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <ForecastDay key={idx} day={forecastDays[idx]} item={item} />
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
