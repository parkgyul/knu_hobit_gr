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

    // 이벤트 핸들러 등록
    // eventSource.onopen = (response) => {
    //   console.log("연결됬우");
    //   // console.log(response);
    // };

    // eventSource.addEventListener("connect", (event) => {
    //   const { data: data } = event;
    //   console.log("data: ", data);
    //   console.log("event: ", event);
    //   // if(data === 'isTrue'){
    //   //   console.log("isTrue);
    //   // }
    // });

    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log("data: ", data);
      setMessage((prevMessage) => [...prevMessage, data]);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
    };

    return () => {
      eventSource.close();
    };
    // eventSource.addEventListener("message", (event) => {
    //   console.log(event);
    // });

    // eventSource.addEventListener("sensorData", async (event) => {
    //   const eventData = await event.data;
    //   console.log("Received event: ", eventData);

    //   dispatch(receiveDataAction(eventData));
    // });

    // eventSource.onerror = (err) => {
    //   console.log("Received error: ", err);
    // };

    // 컴포넌트 언마운트 시 SSE 연결 종료
    // return () => {
    //   eventSource.close();
    //   console.log("끊겼우");
    // };
  }, []); // dispatch를 의존성 배열에 추가

  return <div></div>;
};

export default ConnectSSE;
