import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import DataSetOption from "../components/dashboard/DataSetOption.js";
import DataSetMonitoring from "../components/dashboard/DataSetMonitoring.js";

const DataSet = () => {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    console.log("선택된 데이터: ", type);
  };

  return (
    <div>
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <DataSetOption onTypeChange={handleTypeChange} />
        </Col>
      </Row>

      {/* 추가적인 빈 공간 */}
      <div style={{ marginBottom: "20px" }}></div>

      {/***Table ***/}
      <Row>
        <Col lg="12">
          <DataSetMonitoring selectedType={selectedType} />
        </Col>
      </Row>
    </div>
  );
};

export default DataSet;
