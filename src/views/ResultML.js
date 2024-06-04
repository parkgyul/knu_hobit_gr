import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import ResultChart from "../components/dashboard/ResultChart";
import { Button } from "reactstrap";

const ResultML = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resultChartData = location.state.resultChartData;

  const handleGoBack = () => {
    navigate("/analysis");
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Button color="dark" size="sm" onClick={handleGoBack}>
          이전 페이지로 돌아가기
        </Button>
      </div>

      {/*보여주자! 학습 결과 그래프*/}
      <ResultChart resultChartData={resultChartData} />
    </div>
  );
};

export default ResultML;
