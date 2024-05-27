import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { Card, CardBody, CardTitle, Table, Spinner } from "reactstrap";

const DataSetMonitoring = ({ selectedType }) => {
  const [dataSet, setDataSet] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendDataSetTypes = async (type) => {
    console.log(type);
    const [bucketName, measurement] = type.split(",");
    console.log("Bucket Name:", typeof bucketName);
    console.log("Measurement:", typeof measurement);

    setLoading(true); // Start loading

    try {
      const response = await axios.get(`${API_BASE_URL}/dataset/selection`, {
        params: { bucket_name: bucketName, measurement: measurement },
      });
      console.log(response);
      setDataSet(response.data);
    } catch (error) {
      console.error("불러오지 못함", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (selectedType) {
      sendDataSetTypes(selectedType);
    }
  }, [selectedType]);

  return (
    <div>
      selectedType : {selectedType ? selectedType : "none"}
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
                <CardTitle tag="h5">{selectedType} Monitoring</CardTitle>
              </div>
            </div>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <Spinner style={{ width: "3rem", height: "3rem" }} />{" "}
                {/* Loading Spinner */}
              </div>
            ) : (
              <Table
                className="no-wrap mt-3 align-middle"
                responsive
                borderless
              >
                {dataSet && dataSet.columns && dataSet.data ? (
                  <>
                    <thead>
                      <tr>
                        {dataSet.columns.map((col, index) => (
                          <th key={index}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <div>count : {dataSet.count}</div>
                      <div style={{ width: "1000px" }}>
                        데이터 기록 start : {dataSet.start}
                      </div>
                      <div>데이터 기록 end : {dataSet.end}</div>
                      <div>measurement: {dataSet.measurement}</div>
                      {dataSet.data.map((rowData, rowIndex) => (
                        <tr key={rowIndex} className="border-top">
                          {rowData.map((cellData, cellIndex) => (
                            <td key={cellIndex}>{cellData}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </>
                ) : (
                  <div>조회할 데이터셋을 골라주세요. </div>
                )}
              </Table>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DataSetMonitoring;
