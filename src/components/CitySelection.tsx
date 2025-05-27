import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { CITIES } from "../types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
`;

const CityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 800px;
`;

const CityButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const CitySelection = () => {
  const navigate = useNavigate();

  const handleCitySelect = (city: string) => {
    navigate(`/mood-quote?city=${city}`);
  };

  return (
    <Container>
      <Title>어느 도시의 날씨를 확인할까요?</Title>
      <CityGrid>
        {CITIES.map((city) => (
          <CityButton key={city} onClick={() => handleCitySelect(city)}>
            {city}
          </CityButton>
        ))}
      </CityGrid>
    </Container>
  );
};
