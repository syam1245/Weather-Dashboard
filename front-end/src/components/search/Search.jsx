import { useState, useCallback } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const fetchCities = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      if (!response.ok) throw new Error('Network response was not ok.');
      const data = await response.json();
      return data.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      }));
    } catch (error) {
      console.error('Error fetching cities:', error);
      return [];
    }
  };

  const loadOptions = useCallback(async (inputValue) => {
    return { options: await fetchCities(inputValue) };
  }, []); 

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      additional={{
        "aria-label": "City search" 
      }}
    />
  );
};

export default Search;
