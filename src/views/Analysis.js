// Analysis.js
import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import DataSet from "./DataSet.js";
import SelectParameter from "../components/dashboard/selectParameter.js";

const Analysis = () => {
  const [dataSet, setDataSet] = useState(null);

  const handleDataChange = (data) => {
    setDataSet(data);
  };

  return (
    <div>
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <DataSet onDataChange={handleDataChange} />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <SelectParameter data={dataSet} />
        </Col>
        <SalesChart />
      </Row>
    </div>
  );
};

export default Analysis;
