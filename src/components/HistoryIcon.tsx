import { useState } from "react";
import styled from "@emotion/styled";
import type { HistoryType, HistoryItem as HistoryItemType } from "../types";

const HistoryContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const HistoryButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 10px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const HistoryModal = styled.div`
  position: fixed;
  top: 70px;
  right: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 20px;
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
`;

const HistoryItemWrapper = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const HistoryTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  color: #333;
`;

const HistoryInfo = styled.p`
  margin: 5px 0;
  font-size: 0.9rem;
  color: #666;
`;

const HistoryQuote = styled.p`
  margin: 10px 0;
  font-size: 1rem;
  color: #333;
  font-style: italic;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
  padding: 5px;

  &:hover {
    color: #333;
  }
`;

export const HistoryIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<HistoryType>(() => {
    const saved = localStorage.getItem("quoteHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleItemClick = (item: HistoryItemType) => {
    // 클릭한 히스토리 아이템의 명언을 모달로 표시
    alert(item.quotes.join("\n\n"));
  };

  return (
    <HistoryContainer>
      <HistoryButton onClick={() => setIsOpen(!isOpen)}>📜</HistoryButton>
      {isOpen && (
        <HistoryModal>
          <CloseButton onClick={() => setIsOpen(false)}>✕</CloseButton>
          <h2>명언 히스토리</h2>
          {history.length === 0 ? (
            <p>아직 저장된 명언이 없습니다.</p>
          ) : (
            history.map((item) => (
              <HistoryItemWrapper
                key={item.id}
                onClick={() => handleItemClick(item)}
              >
                <HistoryTitle>
                  {item.city} - {item.mood}
                </HistoryTitle>
                <HistoryInfo>날씨: {item.weather}</HistoryInfo>
                <HistoryInfo>시간: {formatDate(item.timestamp)}</HistoryInfo>
                <HistoryQuote>{item.quotes[0]}</HistoryQuote>
              </HistoryItemWrapper>
            ))
          )}
        </HistoryModal>
      )}
    </HistoryContainer>
  );
};
