/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';

function Display({
  countries,
  searchVal,
  handleButtonShow,
  setExpandedCountry,
  openWeatherResponse,
}) {
  if (countries == null || searchVal == '') {
    return;
  }
  const filtered = countries.filter((country) =>
    country.name.common
      .toString()
      .toLowerCase()
      .includes(searchVal.toString().toLowerCase())
  );
  if (filtered.length === 1) {
    setExpandedCountry(filtered[0]);
    return (
      <CapitalDisplay
        country={filtered[0]}
        openWeatherResponse={openWeatherResponse}
      />
    );
  }
  //Checks list for a exact match if searchvalue matches fully any of the displayed countries treat as match and displayCapital
  //i.e Sudan and South Sudan
  const found = filtered.find(
    (country) => country.name.common.toLowerCase() === searchVal.toLowerCase()
  );
  // console.log(found);
  if (found) {
    setExpandedCountry(found);
    return (
      <CapitalDisplay
        country={found}
        openWeatherResponse={openWeatherResponse}
      />
    );
  }

  if (filtered.length > 10) {
    return (
      <div>
        Search result shows more than 10 countries, please filter more specific
      </div>
    );
  }
  return (
    <>
      {filtered.map((country, i) => (
        <span key={i}>
          {country.name.common}
          <button name={country.name.common} onClick={handleButtonShow}>
            Show
          </button>{' '}
          <br />
        </span>
      ))}
    </>
  );
}
function CapitalDisplay({ country, openWeatherResponse }) {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital ? country.capital : `N/A`}
        <br />
        area {country.area}
      </p>
      <p>
        <b>Languages:</b>
      </p>
      <ul>
        {Object.entries(country.languages).map(([key, val]) => (
          <li key={key}>{val}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      <Weather openWeatherResponse={openWeatherResponse} />
    </>
  );
}
function Weather({ openWeatherResponse }) {
  if (openWeatherResponse == null) {
    return;
  }
  return (
    <>
      <h1>Weather in {openWeatherResponse.name}</h1>
      <p>temperature {openWeatherResponse.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${openWeatherResponse.weather[0].icon}@2x.png`}
      />
      <p>
        wind {openWeatherResponse.wind.deg} degrees,{' '}
        {openWeatherResponse.wind.speed} m/s
      </p>
    </>
  );
}
function App() {
  const [countries, setCountries] = useState(null);
  const [searchVal, setSearchVal] = useState('');
  const [expandedCountry, setExpandedCountry] = useState(null);
  const [openWeatherResponse, setOpenWeatherResponse] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    if (expandedCountry != null) {
      if (expandedCountry.capital) {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${
              expandedCountry.capital[0]
            }&appid=${import.meta.env.VITE_WEATHER_API}&units=metric`
          )
          .then((res) => {
            // console.log(res.data);
            setOpenWeatherResponse(res.data);
          });
      } else {
        //no capital - clear last data
         setOpenWeatherResponse(null);
      }
    }
  }, [expandedCountry]);
  const handleSetSearch = (e) => {
    setSearchVal(e.target.value);
  };
  const handleButtonShow = (e) => {
    setSearchVal(e.target.name);
  };
  return (
    <>
      <form>
        <span>find countries </span>
        <input type="text" value={searchVal} onChange={handleSetSearch} />
      </form>
      <Display
        searchVal={searchVal}
        countries={countries}
        handleButtonShow={handleButtonShow}
        setExpandedCountry={setExpandedCountry}
        openWeatherResponse={openWeatherResponse}
      />
    </>
  );
}

export default App;
