// DataSet.js
import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import DataSetOption from "../components/dashboard/DataSetOption.js";
import DataSetMonitoring from "../components/dashboard/DataSetMonitoring.js";

const DataSet = ({ onDataChange }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    console.log("선택된 데이터: ", type);
  };

  const handleDataSetChange = (data) => {
    onDataChange(data); // 부모 컴포넌트로 데이터 전달
  };

  return (
    <div>
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <DataSetOption onTypeChange={handleTypeChange} />
        </Col>
      </Row>
      <div style={{ marginBottom: "20px" }}></div>
      <Row>
        <Col lg="12">
          <DataSetMonitoring
            selectedType={selectedType}
            onDataSetChange={handleDataSetChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DataSet;
