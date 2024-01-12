import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const CityWeather = (props) => {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  const fetchData = async () => {
    setData(null);
    setForecast(null);

    if (!props.cityName) {
      return;
    }

    try {
      // Fetch tempo di oggi
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${props.cityName}&appid=a61fb44d244d192dd9f1382cbaaacd14`
      );

      if (response.ok) {
        const weatherData = await response.json();
        setData(weatherData);
      } else {
        console.log("Error fetching data");
        setNotFound(true);
      }

      // Fetch previsioni 5 giorni
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${props.cityName}&appid=a61fb44d244d192dd9f1382cbaaacd14`
      );

      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        setForecast(forecastData);
      } else {
        console.log("Error fetching forecast");
        setNotFound(true);
      }
    } catch (error) {
      console.log("Error fetching data", error);
      setNotFound(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.cityName]);

  if (!data || !forecast) {
    if (notFound) {
      return (
        <Container className="weatherCard mb-2 w-100 w-md-50">
          <Row className="d-flex">
            <Col xs={12} className="d-flex flex-column">
              <h2>City not found!</h2>
            </Col>
          </Row>
        </Container>
      );
    }
    return (
      <Container className="weatherCard mb-2">
        <Row className="d-flex">
          <Col xs={12} className="d-flex flex-column">
            <h2>Loading...</h2>
          </Col>
        </Row>
      </Container>
    );
  }

  const temperature = kelvinToCelsius(data.main.temp);
  const humidity = data.main.humidity;
  const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const description = data.weather[0].description;
  const country = data.sys.country;

  // Prendo i dati delle previsioni dei 5 giorni successivi ad un orario fisso
  const dailyForecasts = forecast.list.filter((item) => item.dt_txt.includes("12:00:00"));

  return (
    <>
      <Container className="weatherCard mb-2">
        <Row className="d-flex">
          <Col xs={12} md={6} className="d-flex flex-column">
            <h1 className="display-1">{temperature}°C</h1>
            <h4 className="text-secondary">
              {props.cityName}, {country}
            </h4>
            <p>Umidità: {humidity}%</p>
          </Col>
          <Col xs={12} md={6} className="d-flex flex-column">
            <img src={iconUrl} alt="weather icon" className="weatherIcon" />
            <p className="fs-3 text-center">{description}</p>
          </Col>
        </Row>
      </Container>
      <Container className="weatherCard">
        <Row>
          <Col>
            <h3>Previsioni a 5 giorni</h3>
            <hr />
            <div className="d-flex flex-wrap justify-content-around justify-content-md-between">
              {dailyForecasts.map((forecast) => (
                <div key={forecast.dt}>
                  <p>
                    {new Date(forecast.dt_txt).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <img src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} alt="icone meteo" />
                  <p>{kelvinToCelsius(forecast.main.temp)}°C</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CityWeather;
