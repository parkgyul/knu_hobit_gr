// Analysis.js
import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import DataSet from "./DataSet.js";
import SelectParameter from "../components/dashboard/selectParameter.js";

const Analysis = () => {
  const [dataSet, setDataSet] = useState(null);
  const [dataType, setDataType] = useState(null);

  const handleDataChange = (data) => {
    console.log("data", data);
    setDataSet(data);
  };

  const handleDataTypeChange = (type) => {
    console.log("type: " + type);
    setDataType(type);
  };

  return (
    <div>
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <DataSet
            onDataChange={handleDataChange}
            onDataTypeChange={handleDataTypeChange}
          />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <SelectParameter dataType={dataType} data={dataSet} />
        </Col>
        <SalesChart />
      </Row>
    </div>
  );
};

export default Analysis;
