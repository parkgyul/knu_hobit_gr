// Results.js
import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import ResultTable from "../components/dashboard/ResultTable";

const Analysis = () => {
  const [dataSet, setDataSet] = useState(null);
  const [dataType, setDataType] = useState(null);

  return (
    <div>
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <ResultTable />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4"></Col>
        <SalesChart />
      </Row>
    </div>
  );
};

export default Analysis;
