import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardBody, CardTitle, Table, Button } from "reactstrap";
import "../../assets/scss/layout/modalStyle.css";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";
import ReactPaginate from "react-paginate";
import "./pagination.css";

const ResultTable = ({ onResultChartDataUpdate }) => {
  const [resultsList, setResultsList] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const resultsPerPage = 10;

  const getResultsList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dataset/ml-list`);
      setResultsList(response.data);
    } catch (error) {
      console.error("getResultsList 불러오지 못함", error);
    }
  };

  const handleResultChartView = (resultChartData) => {
    navigate("/result", {
      state: { resultChartData: resultChartData },
    });
  };

  const clickResultsMonitoring = async (start) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dataset/ml/${start}`);
      handleResultChartView(response.data);
      onResultChartDataUpdate(response.data);
    } catch (error) {
      console.error("clickResultsMonitoring 불러오지 못함", error);
    }
  };

  useEffect(() => {
    getResultsList();
  }, []);

  //pagination
  const offset = currentPage * resultsPerPage;
  const currentResults = resultsList.slice(offset, offset + resultsPerPage);
  const pageCount = Math.ceil(resultsList.length / resultsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
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

  return (
    <div>
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
              <CardTitle tag="h3">ML Results</CardTitle>
              <CardTitle tag="h6">모델 학습 결과 저장소</CardTitle>
            </div>
          </div>

          {resultsList.length > 0 ? (
            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>bucket</th>
                  <th>measurement</th>
                  <th>tag_key</th>
                  <th>tag_value</th>
                  <th>mlStart</th>
                  <th>mlEnd</th>
                </tr>
              </thead>
              <tbody>
                {currentResults.map((result) => (
                  <tr key={result.mlStart} className="border-top">
                    <td>
                      <div className="ms-3">
                        <h5 className="mb-0">{result.bucket}</h5>
                      </div>
                    </td>
                    <td>
                      <h5 className="mb-0">{result.measurement}</h5>
                    </td>
                    <td>
                      <h5 className="mb-0">{result.tagKey}</h5>
                    </td>
                    <td>
                      <h5 className="mb-0">{result.tagValue}</h5>
                    </td>
                    <td>
                      <h5 className="mb-0">{formatDate(result.mlStart)}</h5>
                    </td>
                    <td>
                      <h5 className="mb-0">{formatDate(result.mlEnd)}</h5>
                    </td>
                    <td className="text-end">
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={() => clickResultsMonitoring(result.mlStart)}
                      >
                        모델 학습 결과 보기
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h3>ML 학습 페이지로 가서 모델 학습을 진행 시켜주세요.</h3>
          )}

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={10}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ResultTable;
