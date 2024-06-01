import { Card, CardBody, CardSubtitle, CardTitle, Row, Col } from "reactstrap";
import Chart from "react-apexcharts";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
const SalesChart = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    getModelResult();
  }, []);
  const getModelResult = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dataset/type`);
      console.log(response.data.dataset_list);
      setResult(response.data);
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };

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
    colors: ["#0d6efd", "#009efb", "#6771dc"],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
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
      name: "2020",
      data: [10, 100, 10, 100, 10, 100, 30, 30, 40, 10, 10, 10],
    },
    {
      name: "2022",
      data: [10, 20, 40, 60, 20, 40, 50, 60, 20, 10, 10, 10],
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">트랜스포터</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Yearly Report
        </CardSubtitle>
        <div className="bg-primary text-white my-3 p-3 rounded">
          <Row>
            <Col md="4">
              <h6>Total Hours</h6>
              <h4 className="mb-0 fw-bold">수정중</h4>
            </Col>
            <Col md="4">
              <h6>This Month</h6>
              <h4 className="mb-0 fw-bold">7,545</h4>
            </Col>
            <Col md="4">
              <h6>This Week</h6>
              <h4 className="mb-0 fw-bold">1,345</h4>
            </Col>
          </Row>
        </div>
        <Chart options={options} series={series} type="area" height="279" />
      </CardBody>
    </Card>
  );
};

export default SalesChart;
