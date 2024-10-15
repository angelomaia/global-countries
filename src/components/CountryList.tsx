import { useQuery, gql } from '@apollo/client';
import { useState, useEffect } from 'react';
import CountriesFilter from './CountryFilter';
import CountryCard from './CountryCard';

const GET_COUNTRIES = gql`
  query {
    countries {
      emoji
      name
      capital
      languages {
        name
      }
    }
  }
`;

interface Country {
  name: string;
  emoji: string;
  capital: string;
  languages: {
    name: string;
  }[];
}

interface CountriesData {
  countries: Country[];
}

function CountriesList() {
  const { loading, error, data } = useQuery<CountriesData>(GET_COUNTRIES);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredCountries(data.countries);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <CountriesFilter
        countries={data?.countries || []}
        onFilter={(filtered) => setFilteredCountries(filtered)}
      />

      {filteredCountries.map(({ name, emoji, capital, languages }) => (
        <CountryCard
          key={name}
          name={name}
          emoji={emoji}
          capital={capital}
          languages={languages}
        />
      ))}
    </>
  );
}

export default CountriesList;
