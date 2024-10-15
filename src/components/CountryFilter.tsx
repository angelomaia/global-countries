import { useEffect, useState } from 'react';
import * as Styled from '../assets/CountriesList.style';

interface Country {
  name: string;
  emoji: string;
  capital: string;
  languages: {
    name: string;
  }[];
}

interface CountriesFilterProps {
  countries: Country[];
  onFilter: (filteredCountries: Country[]) => void;
}

function CountriesFilter({ countries, onFilter }: CountriesFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const uniqueLanguages = Array.from(
    new Set(countries.flatMap((country) => country.languages.map((lang) => lang.name)))
  );

  useEffect(() => {
    const filteredCountries = countries.filter((country) => {
      const countryName = country.name.toLowerCase();
      const countryCapital = country.capital ? country.capital.toLowerCase() : '';
      const matchesSearch = countryName.includes(searchTerm.toLowerCase()) || countryCapital.includes(searchTerm.toLowerCase());
      const matchesLanguage = selectedLanguage === '' || country.languages.some((lang) => lang.name === selectedLanguage);

      return matchesSearch && matchesLanguage;
    });

    onFilter(filteredCountries);
  }, [searchTerm, selectedLanguage, countries, onFilter]);

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
    </>
  );
}

export default CountriesFilter;
