// DataSetMonitoring.js
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { Card, CardBody, CardTitle, Table, Spinner } from "reactstrap";

const DataSetMonitoring = ({ selectedType, onDataSetChange }) => {
  const [dataSet, setDataSet] = useState({});
  const [loading, setLoading] = useState(false);
  const [bucketName, setBucketName] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [tagKey, setTagKey] = useState("");
  const [tagValue, setTagValue] = useState("");

  const sendDataSetTypes = async (type) => {
    setLoading(true);
    try {
      const [bucketName, measurement, tag_key, tag_value] = type;
      setBucketName(bucketName);
      setMeasurement(measurement);
      setTagKey(tag_key);
      setTagValue(tag_value);
      const response = await axios.get(`${API_BASE_URL}/dataset/selection`, {
        params: {
          bucket_name: bucketName,
          measurement: measurement,
          tag_key: tag_key,
          tag_value: tag_value,
        },
      });
      setDataSet(response.data);
      onDataSetChange(response.data); // 부모 컴포넌트로 데이터 전달
    } catch (error) {
      console.error("데이터를 불러오지 못했습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedType) {
      sendDataSetTypes(selectedType);
    }
  }, [selectedType]);

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
              <CardTitle tag="h5" bold>
                Selected Data Type :
                {selectedType
                  ? `  ${bucketName} / ${measurement} / ${tagKey} / ${tagValue}`
                  : "none"}
              </CardTitle>
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
              <Spinner style={{ width: "3rem", height: "3rem" }} />
            </div>
          ) : (
            <Table
              className="no-wrap mt-3 align-middle"
              responsive
              bordered
              variant="dark"
            >
              {dataSet && dataSet.columns && dataSet.data ? (
                <>
                  <thead>
                    <tr>
                      {dataSet.columns.map((col, index) => (
                        <th key={index} className="small-font">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataSet.data.map((rowData, rowIndex) => (
                      <tr key={rowIndex} className="border-top">
                        {rowData.map((cellData, cellIndex) => (
                          <td key={cellIndex}>
                            {cellData === null ? "null" : cellData}
                          </td>
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
          {dataSet.count !== undefined && <li>count : {dataSet.count}</li>}
          {dataSet.start && dataSet.end && (
            <li style={{ width: "1000px" }}>
              데이터 기록 start : {dataSet.start}
            </li>
          )}
          {dataSet.start && dataSet.end && (
            <li>데이터 기록 end : {dataSet.end}</li>
          )}
          {dataSet.measurement && <li>measurement: {dataSet.measurement}</li>}
        </CardBody>
      </Card>
    </div>
  );
};

export default DataSetMonitoring;
