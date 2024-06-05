import { Col, Row } from "reactstrap";
import ConnectSSE from "../connectSSE.js";
import Options from "../components/dashboard/options.js";
import ProjectTables from "../components/dashboard/TransporterTable.js";
import Location from "../components/dashboard/Location.js";
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import axios from "axios";

const Starter = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sensorList, setSensorList] = useState([]);

  const getSensorList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sensor/read`);
      setSensorList(response.data);
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };

  useEffect(() => {
    getSensorList();
    return () => {
      console.log("Starter 컴포넌트가 언마운트되었습니다.");
      disconnectionStreamingData();
    };
  }, []);

  const disconnectionStreamingData = async () => {
    console.log("클린업 작업을 수행합니다.");
    try {
      const response = await axios.get(
        `${API_BASE_URL}/sensor/disconnectionStreamingData`
      );
      console.log("응답을 성공적으로 받았습니다:", response.data);
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };

  return (
    <div>
      {<ConnectSSE />}

      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <Location />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Options
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            sensorList={sensorList}
          />
        </Col>
      </Row>

      {/* 추가적인 빈 공간 */}
      <div style={{ marginBottom: "20px" }}></div>

      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables selectedIds={selectedIds} sensorList={sensorList} />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
