import { Card, CardBody, CardSubtitle, CardTitle, Row, Col } from "reactstrap";
import Chart from "react-apexcharts";

import { useEffect, useState } from "react";
const ResultChart = ({ resultChartData }) => {
  const [mlResult, setMlresult] = useState([]);

  useEffect(() => {
    if (resultChartData) {
      setMlresult(resultChartData);
    }
  }, [resultChartData]);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    legend: {
      show: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 2,
      },
    },
    //colors: ["#0d6efd", "#009efb", "#6771dc"],
    colors: ["rgba(255, 69, 96, 0.9)", "rgba(0, 227, 150, 0.9)"],
    xaxis: {
      categories: mlResult.categories || [],
      labels: {
        formatter: function (val, index) {
          const totalLabels = mlResult.powerConsumptionList
            ? mlResult.powerConsumptionList.length
            : 0;
          const interval = Math.ceil(totalLabels / 20);
          return index % interval === 0 || index === totalLabels - 1 ? val : "";
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toFixed(2);
        },
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "60%",
              borderRadius: 7,
            },
          },
        },
      },
    ],
  };
  const series = [
    {
      name: "Actual_list",
      data: mlResult.powerConsumptionList || [],
    },
    {
      name: "Prediction_list",
      data: mlResult.predictionList || [],
    },
  ];

  return (
    <Card>
      {mlResult && Object.keys(mlResult).length > 0 ? (
        <CardBody>
          <CardTitle tag="h5">ML 학습 결과</CardTitle>
          {resultChartData.bucket && (
            <CardSubtitle className="text-muted" tag="h5">
              {resultChartData.bucket}/{resultChartData.measurement}/
              {resultChartData.tagKey}/{resultChartData.tagValue}
            </CardSubtitle>
          )}
          <div className="bg-primary text-white my-3 p-3 rounded">
            <Row>
              <Col md="4">
                <h6>mse</h6>
                <h4 className="mb-0 fw-bold">{mlResult.mse}</h4>
              </Col>
              <Col md="4">
                <h6>Rmse</h6>
                <h4 className="mb-0 fw-bold">{mlResult.rmse}</h4>
              </Col>
              <Col md="4">
                <h6>r2</h6>
                <h4 className="mb-0 fw-bold">{mlResult.r2}</h4>
              </Col>
            </Row>
          </div>
          <Chart options={options} series={series} type="area" height="279" />
        </CardBody>
      ) : (
        <Card>
          <h3>학습 결과 기다리는 중...</h3>
        </Card>
      )}
    </Card>
  );
};

export default ResultChart;
