import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "../../assets/scss/layout/modalStyle.css";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";
import ReactPaginate from "react-paginate";
import "./pagination.css";

const SensorTable = () => {
  const [resultsList, setResultsList] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const resultsPerPage = 5;

  const getResultsList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dataset/ml-list`);
      console.log(response.data);
      setResultsList(response.data);
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };

  const clickResultsMonitoring = (start) => {
    try {
      const response = axios.get(
        `${API_BASE_URL}/dataset/ml`,
        {},
        {
          params: {
            mlStart: start,
          },
        }
      );
      console.log("ml 결과 ", response.data);
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };

  //mlStart
  useEffect(() => {
    getResultsList();
  }, []);

  //pagination
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * resultsPerPage;
  const currentResults = resultsList.slice(offset, offset + resultsPerPage);
  const pageCount = Math.ceil(resultsList.length / resultsPerPage);

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
              <CardTitle tag="h5">ML model Results List</CardTitle>
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
                      <h5 className="mb-0">{result.tag_key}</h5>
                    </td>
                    <td>
                      <h5 className="mb-0">{result.tag_value}</h5>
                    </td>
                    <td>
                      <h5 className="mb-0">{result.mlStart}</h5>
                    </td>
                    <td>
                      <h5 className="mb-0">{result.tag_value}</h5>
                    </td>
                    <td className="text-end">
                      <Button
                        color="info"
                        size="sm"
                        onClick={() => clickResultsMonitoring(result.mlStart)}
                      ></Button>
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
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default SensorTable;
