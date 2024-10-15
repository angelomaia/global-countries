import * as Styled from '../assets/CountriesList.style';

interface CountryCardProps {
  name: string;
  emoji: string;
  capital: string;
  languages: { name: string }[];
}

function CountryCard({ name, emoji, capital, languages }: CountryCardProps) {
  return (
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
  );
}

export default CountryCard;