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
  const [selectedLanguage, setSelectedLanguage] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const uniqueLanguages = Array.from(
    new Set(data?.countries.flatMap((country) => country.languages.map((lang) => lang.name)))
  );

  const filteredCountries = data?.countries.filter((country) => {
    const countryName = country.name.toLowerCase();
    const countryCapital = country.capital ? country.capital.toLowerCase() : '';
    const matchesSearch = countryName.includes(searchTerm.toLowerCase()) || countryCapital.includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === '' || country.languages.some((lang) => lang.name === selectedLanguage);

    return matchesSearch && matchesLanguage;
  });

  return (
    <>
      <Styled.SearchInput
        type="text"
        placeholder="Search by country name or capital..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Styled.LanguageDropdown
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="">All Languages</option>
        {uniqueLanguages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </Styled.LanguageDropdown>

      {filteredCountries?.map(({ name, emoji, capital, languages }) => (
        <Styled.CountryCard key={name} className="country-card">
          <Styled.CountryEmoji>{emoji}</Styled.CountryEmoji>
          <Styled.CountryName>{name}</Styled.CountryName>
          <Styled.CountryCapital>Capital: {capital}</Styled.CountryCapital>
          <Styled.CountryLanguages>
            Languages:{' '}
            {languages.map((lang) => (
              <Styled.LanguageTag key={lang.name} className="country-language">
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