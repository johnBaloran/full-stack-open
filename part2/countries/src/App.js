import axios from "axios";

import { useState, useEffect } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  console.log("render", countries.length, "countries");
  console.log(countries);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(newFilter)
  );

  let selectedCountry;
  let languages = [];
  let imgLink;
  if (filteredCountries.length === 1) {
    selectedCountry = true;
    languages = Object.values(filteredCountries[0].languages);
    imgLink = filteredCountries[0].flags.png;
    console.log(imgLink);
  } else {
    selectedCountry = false;
  }
  const handleNewFilter = (event) => {
    setNewFilter(event.target.value.toLowerCase());
  };

  return (
    <div>
      <div>
        find countries <input value={newFilter} onChange={handleNewFilter} />
      </div>
      {selectedCountry ? (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <p>capital {filteredCountries[0].capital[0]}</p>
          <p>area {filteredCountries[0].area}</p>
          <br />
          <h2>Languages:</h2>
          <ul>
            {languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={imgLink} alt="flag" />
        </div>
      ) : (
        <div>
          {filteredCountries.length > 0 &&
            filteredCountries.length <= 10 &&
            filteredCountries.map((country) => (
              <p key={country.name.common}>
                {country.name.common}
                <button value={country.name.common} onClick={handleNewFilter}>
                  show
                </button>
              </p>
            ))}
          {filteredCountries.length > 10 && (
            <p>Too many matches, specify another filter</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
