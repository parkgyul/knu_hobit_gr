import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import ResultChart from "../components/dashboard/ResultChart.js";
import DataSet from "./DataSet.js";
import SelectParameter from "../components/dashboard/SelectParameter.js";

const Analysis = () => {
  const [dataSet, setDataSet] = useState(null);
  const [dataType, setDataType] = useState(null);
  const [resultChartData, setResultChartData] = useState(null);

  const handleDataChange = (data) => {
    setDataSet(data);
  };

  const handleDataTypeChange = (type) => {
    setDataType(type);
  };

  return (
    <div>
      <Row>
        <Col sm="6" lg="6" xl="8" xxl="8">
          <DataSet
            onDataChange={handleDataChange}
            onDataTypeChange={handleDataTypeChange}
          />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <SelectParameter
            dataType={dataType}
            data={dataSet}
            onResultChartDataUpdate={setResultChartData}
          />
        </Col>
        {/* <ResultChart resultChartData={resultChartData} />*/}
      </Row>
    </div>
  );
};

export default Analysis;
