import { Col, Row } from "reactstrap";
import { useState } from "react";
import DataSetOption from "../components/dashboard/DataSetOption.js";
import DataSetMonitoring from "../components/dashboard/DataSetMonitoring.js";

const DataSet = () => {
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (type) => {
    setSelectedType(type);
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
