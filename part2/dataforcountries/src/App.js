import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = () => {
    return countries.length == 0
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        );
  };

  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} countries={countries} />
      <Countries countries={filteredCountries()} />
    </div>
  );
};

export default App;
