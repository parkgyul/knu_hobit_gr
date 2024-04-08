import React, { useState, useEffect } from "react";
import Stomp from "stompjs";

const WebSocketComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");
    const stomp = Stomp.over(socket);
    stomp.connect({}, () => {
      console.log("Connected to WebSocket");
      stomp.subscribe("/topic/data", (response) => {
        const jsonData = JSON.parse(response.body);
        setData(jsonData);
      });
    });
    return () => {
      stomp.disconnect();
    };
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h2>Data Received:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>No data received yet.</p>
      )}
    </div>
  );
};

export default WebSocketComponent;
