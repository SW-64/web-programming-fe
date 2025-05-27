import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { MoodType } from "../types";

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

const MoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
`;

const MoodButton = styled.button`
  padding: 1.5rem 3rem;
  font-size: 1.3rem;
  border: none;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 250px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const MOODS: { [key in MoodType]: string } = {
  happy: "행복해요 😊",
  tired: "피곤해요 😫",
  confused: "혼란스러워요 🤔",
  sad: "슬퍼요 😢",
  hungry: "배고파요 🍽️",
  clear: "맑아요 ☀️",
  clouds: "흐려요 ☁️",
  rain: "비와요 🌧️",
};

export const MoodSelection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");

  const handleMoodSelect = (mood: MoodType) => {
    navigate(`/mood-quote/result?city=${city}&mood=${mood}`);
  };

  return (
    <Container>
      <Title>오늘의 기분은 어떠신가요?</Title>
      <MoodGrid>
        {Object.entries(MOODS).map(([mood, label]) => (
          <MoodButton
            key={mood}
            onClick={() => handleMoodSelect(mood as MoodType)}
          >
            {label}
          </MoodButton>
        ))}
      </MoodGrid>
    </Container>
  );
};
