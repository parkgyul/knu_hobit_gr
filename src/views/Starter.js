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
  const [operationStatus, setOperationStatus] = useState("all");
  const [loadStatus, setLoadStatus] = useState("all");
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
  }, []);
  return (
    <div>
      <ConnectSSE />

      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <Location selectedIds={selectedIds} />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Options
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            operationStatus={operationStatus}
            setOperationStatus={setOperationStatus}
            loadStatus={loadStatus}
            setLoadStatus={setLoadStatus}
            sensorList={sensorList}
          />
        </Col>
      </Row>

      {/* 추가적인 빈 공간 */}
      <div style={{ marginBottom: "20px" }}></div>

      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables
            selectedIds={selectedIds}
            operationStatus={operationStatus}
            loadStatus={loadStatus}
            sensorList={sensorList}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
