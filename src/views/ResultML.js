import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import ResultChart from "../components/dashboard/ResultChart";
import { Card, CardBody, CardTitle, Table, Button } from "reactstrap";
const ResultChartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resultChartData = location.state.resultChartData;

  const handleGoBack = () => {
    navigate("/results");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" });
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}년 ${month} ${day}일 ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  };

  const formatDate2 = (isoDateString) => {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Button color="secondary" size="sm" onClick={handleGoBack}>
          이전 페이지로 돌아가기
        </Button>
      </div>

      {/*보여주자! 학습 결과 그래프*/}
      <ResultChart resultChartData={resultChartData} />
    </div>
  );
};

export default ResultChartPage;
