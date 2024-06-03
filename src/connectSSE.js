import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { receiveDataAction } from "./redux/actions";
import { SSE_URL } from "./config";

const ConnectSSE = () => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false); // 연결 상태 상태(state) 추가
  const [message, setMessage] = useState([]);

  useEffect(() => {
    // SSE 연결 설정
    console.log("SSE 연결 시도 중...");
    const eventSource = new EventSource(`${SSE_URL}`, {
      withCredentials: true,
    });
    console.log("됐니?");
    console.log(eventSource);

    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data);

      setMessage((prevMessage) => [...prevMessage, data]);
      dispatch(receiveDataAction(data));
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return <div></div>;
};

export default ConnectSSE;
