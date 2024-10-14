import styled from 'styled-components';

export const CountryCard = styled.div`
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

export const CountryEmoji = styled.h3`
  font-size: 3rem;
  margin: 0;
`;

export const CountryName = styled.h2`
  font-size: 1.8rem;
  margin: 10px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const CountryCapital = styled.h3`
  font-size: 1.2rem;
  font-weight: 300;
  color: #f0f0f0;
  opacity: 0.9;
  margin-bottom: 10px;
`;

export const CountryLanguages = styled.p`
  font-size: 1rem;
  font-style: italic;
  color: #ddd;
`;

export const LanguageTag = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
  display: inline-block;
  color: #ffffff;
`;

export const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  font-size: 1.2rem;
  border: 2px solid #ccc;
  border-radius: 8px;
`;