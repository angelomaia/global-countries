import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import * as Styled from './assets/CountriesList.style';

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
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredCountries = data?.countries.filter((country) => {
    const countryName = country.name.toLowerCase();
    const countryCapital = country.capital ? country.capital.toLowerCase() : '';
    return countryName.includes(searchTerm.toLowerCase()) || countryCapital.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <Styled.SearchInput
        type="text"
        placeholder="Search by country name or capital..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCountries?.map(({ name, emoji, capital, languages }) => (
        <Styled.CountryCard key={name} className="country-card">
          <Styled.CountryEmoji>{emoji}</Styled.CountryEmoji>
          <Styled.CountryName>{name}</Styled.CountryName>
          <Styled.CountryCapital>Capital: {capital}</Styled.CountryCapital>
          <Styled.CountryLanguages>
            Languages:{' '}
            {languages.map((lang) => (
              <Styled.LanguageTag key={lang.name}>{lang.name}</Styled.LanguageTag>
            ))}
          </Styled.CountryLanguages>
        </Styled.CountryCard>
      ))}
    </>
  );
}

export default CountriesList;