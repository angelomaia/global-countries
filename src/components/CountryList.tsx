import { useQuery, gql } from '@apollo/client';
import { useState, useEffect } from 'react';
import * as Styled from '../assets/CountriesList.style';
import CountriesFilter from './CountryFilter';

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
        <Styled.CountryCard key={name} className="country-card">
          <Styled.CountryEmoji>{emoji}</Styled.CountryEmoji>
          <Styled.CountryName>{name}</Styled.CountryName>
          <Styled.CountryCapital>Capital: {capital}</Styled.CountryCapital>
          <Styled.CountryLanguages>
            Languages:{' '}
            {languages.map((lang) => (
              <Styled.LanguageTag key={lang.name} className="language">
                {lang.name}
              </Styled.LanguageTag>
            ))}
          </Styled.CountryLanguages>
        </Styled.CountryCard>
      ))}
    </>
  );
}

export default CountriesList;
