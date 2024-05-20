import { Col, Row } from "reactstrap";
import ConnectSSE from "../connectSSE.js";

import Options from "../components/dashboard/options.js";
import ProjectTables from "../components/dashboard/TransporterTable.js";
import Location from "../components/dashboard/location.js";

const Starter = () => {
  return (
    <div>
      {/* StarterComponent를 렌더링 */}
      <ConnectSSE />

      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <Location />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Options />
        </Col>
      </Row>

      {/* 추가적인 빈 공간 */}
      <div style={{ marginBottom: "20px" }}></div>

      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
