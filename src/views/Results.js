// Results.js
import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import ResultTable from "../components/dashboard/ResultTable";
import ResultChart from "../components/dashboard/ResultChart.js";
const Analysis = () => {
  const [resultChartData, setResultChartData] = useState(null);

  return (
    <div>
      <Row>
        <Col sm="10" lg="10" xl="10" xxl="12">
          <ResultTable onResultChartDataUpdate={setResultChartData} />
        </Col>
        {/*<ResultChart resultChartData={resultChartData} />*/}
      </Row>
    </div>
  );
};

export default Analysis;
