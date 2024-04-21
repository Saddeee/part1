import { useEffect, useState } from "react";
import axios from "axios";

const renderCountryInfo = (country) => {
  return (
    <div key={country.cca3}>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([code, name]) => (
          <li key={code}>{name}</li>
        ))}
      </ul>
      <br />
      <h1>{country.flag}</h1>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [select, setSelected] = useState(null);

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

  const hook = () => {
    axios
      .get(baseUrl)
      .then((req) => {
        setCountries(req.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(hook, []);

  const handleNewCountry = (event) => {
    setSearch(event.target.value.toLowerCase());
    setSelected(null);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search)
  );

  const handleSelect = (country) => {
    setSelected(country);
  };

  const countryToShow = () => {
    if (filteredCountries.length > 10) {
      return "Too many countries";
    }
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      return renderCountryInfo(country);
    } else {
      return filteredCountries.map((country) => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => handleSelect(country)}>show</button>
        </div>
      ));
    }
  };

  return (
    <div>
      <form onSubmit={handleNewCountry}>
        Find countries:
        <input value={search} type="text" onChange={handleNewCountry} />
      </form>
      <div>{select ? renderCountryInfo(select) : countryToShow()}</div>
    </div>
  );
};

export default App;
