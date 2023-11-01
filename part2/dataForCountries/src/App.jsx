/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
function Display({ countries, searchVal, handleButtonShow }) {
  if (countries == null || searchVal == '') {
    return;
  }
  const filtered = countries.filter((country) =>
    country.name.common
      .toString()
      .toLowerCase()
      .includes(searchVal.toString().toLowerCase())
  );
  if (filtered.length > 10) {
    return (
      <div>
        Search result shows more than 10 countries, please filter more specific
      </div>
    );
  }

  if (filtered.length === 1) {
    return (
      <>
        <h1>{filtered[0].name.common}</h1>
        <p>
          capital {filtered[0].capital ? filtered[0].capital[0] : `N/A`}
          <br />
          area {filtered[0].area}
        </p>
        <p>
          <b>Languages:</b>
        </p>
        <ul>
          {Object.entries(filtered[0].languages).map(([key, val]) => (
            <li key={key}>{val}</li>
          ))}
        </ul>
        <img src={filtered[0].flags.png} />
      </>
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
function App() {
  const [countries, setCountries] = useState(null);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        console.log(response.data);
        setCountries(response.data);
      });
  }, []);
  const handleSetSearch = (e) => {
    setSearchVal(e.target.value);
  };
  const handleButtonShow = (e) => {
    console.log(e.target);
    console.log(e.target.name);

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
      />
    </>
  );
}

export default App;
