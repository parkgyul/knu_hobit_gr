import React from "react";
import { useSelector } from "react-redux";

const ReduxStateViewer = () => {
  const messages = useSelector((state) => state.messages) || [];

  return (
    <div>
      <h2>Redux 상태 확인</h2>
      {messages.length === 0 ? (
        <p>메시지가 없습니다.</p>
      ) : (
        <div>
          <p>메시지 목록:</p>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{JSON.stringify(message)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReduxStateViewer;
