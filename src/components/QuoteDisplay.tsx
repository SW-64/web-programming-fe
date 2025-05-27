import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { QuoteResponse, HistoryItem } from "../types";
import { API_URL } from "../config";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const QuoteCard = styled.div`
  background-color: white;
  padding: 4rem;
  border-radius: 24px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 95%;
  text-align: center;
  margin: 2rem;
`;

const Quote = styled.p`
  font-size: 2.5rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 3rem;
  font-weight: 500;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const WeatherInfo = styled.div`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
  font-weight: 500;
`;

const BackButton = styled.button`
  padding: 1.2rem 2.5rem;
  font-size: 1.3rem;
  border: none;
  border-radius: 12px;
  background-color: #333;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #444;
    transform: translateY(-2px);
  }
`;

export const QuoteDisplay = () => {
  const [searchParams] = useSearchParams();
  const [quoteData, setQuoteData] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const saveToHistory = (data: QuoteResponse) => {
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      ...data,
      timestamp: Date.now(),
    };

    const savedHistory = localStorage.getItem("quoteHistory");
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    history.unshift(historyItem); // 새로운 항목을 맨 앞에 추가
    localStorage.setItem("quoteHistory", JSON.stringify(history));
  };

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const city = searchParams.get("city");
        const mood = searchParams.get("mood");

        console.log("현재 URL 파라미터:", { city, mood });

        if (!city || !mood) {
          throw new Error("도시와 기분 정보가 필요합니다.");
        }

        console.log(
          "API 요청 시작:",
          `${API_URL}/mood-quote?city=${city}&mood=${mood}`
        );
        const response = await fetch(
          `${API_URL}/mood-quote?city=${city}&mood=${mood}`
        );
        console.log("API 응답 상태:", response.status);

        if (!response.ok) {
          throw new Error("명언을 가져오는데 실패했습니다.");
        }

        const data = await response.json();
        console.log("받은 데이터:", data);
        setQuoteData(data);
        saveToHistory(data);
      } catch (err) {
        console.error("에러 발생:", err);
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [searchParams]);

  if (loading) {
    return (
      <Container>
        <QuoteCard>
          <Quote>명언을 불러오는 중...</Quote>
        </QuoteCard>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <QuoteCard>
          <Quote>{error}</Quote>
          <BackButton onClick={() => window.history.back()}>
            돌아가기
          </BackButton>
        </QuoteCard>
      </Container>
    );
  }

  if (!quoteData) {
    return null;
  }

  return (
    <Container>
      <QuoteCard>
        <WeatherInfo>
          {quoteData.city}의 날씨: {quoteData.weather}
        </WeatherInfo>
        {quoteData.quotes.map((quote, index) => (
          <Quote key={index}>{quote}</Quote>
        ))}
        <BackButton onClick={() => window.history.back()}>돌아가기</BackButton>
      </QuoteCard>
    </Container>
  );
};
