import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import ResultChart from "../components/dashboard/ResultChart";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
} from "reactstrap";
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

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

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

      <Card>
        <CardBody>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <CardTitle tag="h5">학습 상세 정보</CardTitle>
            </div>
          </div>

          <Table className="no-wrap mt-3 align-middle" responsive bordered>
            <thead>
              <tr>
                <th>Label Option</th>
                <th>Feature Option List</th>
                <th>Data Start</th>
                <th>Data End</th>
                <th>nEstimator</th>
                <th>Train Ratio</th>
                <th>ml Start</th>
                <th>ml End</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-top">
                <td>
                  <h5 className="mb-0">{resultChartData.label_option}</h5>
                </td>
                <td>
                  {resultChartData.featureOptionList.map((option, index) => (
                    <span key={index}>
                      {option}
                      {index !== resultChartData.featureOptionList.length - 1
                        ? ", "
                        : ""}
                    </span>
                  ))}
                </td>

                <td>
                  <h6 className="mb-0">
                    {formatDate2(resultChartData.dataStart)}
                  </h6>
                </td>
                <td>
                  <h6 className="mb-0">
                    {formatDate2(resultChartData.dataEnd)}
                  </h6>
                </td>
                <td>
                  <h5 className="mb-0">{resultChartData.nEstimators}</h5>
                </td>
                <td>
                  <h5 className="mb-0">{resultChartData.trainRatio}</h5>
                </td>
                <td>
                  <h6 className="mb-0">
                    {formatDate(resultChartData.mlStart)}
                  </h6>
                </td>
                <td>
                  <h6 className="mb-0">{formatDate(resultChartData.mlEnd)}</h6>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ResultChartPage;
