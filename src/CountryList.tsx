import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';

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

const CountryCard = styled.div`
  background: linear-gradient(145deg, #b0bfdf, #2c2c2d);
  border-radius: 15px;
  padding: 20px;
  margin: 15px 0;
  color: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
`;

const CountryEmoji = styled.h3`
  font-size: 3rem;
  margin: 0;
`;

const CountryName = styled.h2`
  font-size: 1.8rem;
  margin: 10px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CountryCapital = styled.h3`
  font-size: 1.2rem;
  font-weight: 300;
  color: #f0f0f0;
  opacity: 0.9;
  margin-bottom: 10px;
`;

const CountryLanguages = styled.p`
  font-size: 1rem;
  font-style: italic;
  color: #ddd;
`;

const LanguageTag = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
  display: inline-block;
  color: #ffffff;
`;
function CountriesList() {
  const { loading, error, data } = useQuery<CountriesData>(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      {data?.countries.map(({ name, emoji, capital, languages }) => (
        <CountryCard key={name}>
          <CountryEmoji>{emoji}</CountryEmoji>
          <CountryName>{name}</CountryName>
          <CountryCapital>Capital: {capital}</CountryCapital>
          <CountryLanguages>
            Languages:{' '}
            {languages.map((lang) => (
              <LanguageTag key={lang.name}>{lang.name}</LanguageTag>
            ))}
          </CountryLanguages>
        </CountryCard>
      ))}
    </>
  );
}

export default CountriesList;