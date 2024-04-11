import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";
import '../../App.css';
import Checkbox from "./Checkbox.js";
import ApplyButton from "./ApplyButton.js";
import "./ApplyButton.scss";

const OPERATION = [
  { value: "all", name: "전체" },
	{ value: "O", name: "운행 중" },
	{ value: "X", name: "정지" },
];
const LOAD = [
  { value: "all", name: "전체" },
	{ value: "O", name: "상차" },
	{ value: "X", name: "하차" },
];
const SelectBox = (props) => {
	return (
		<select style={{ width: '180px'}}>
			{props.options.map((option) => (
				<option
					value={option.value}
					defaultValue={props.defaultValue === option.value}
				>
					{option.name}
				</option>
			))}
		</select>
	);
};

const Options = () => {
  const LoadContext = React.createContext();
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5" className="font-weight-bold">Opitions</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          트랜스포터/상하차/운행
        </CardSubtitle>
        <hr style={{borderTop: '3px solid #B9B8B8'}} />
        <ListGroup flush className="mt-4">
        <CardTitle tag="h5">
        트랜스포터 ID 선택:
        <div style={{ marginBottom: '10px' }} />

        <Checkbox value="red"> 0000 &nbsp; </Checkbox>
        <Checkbox value="yellow"> 0001 &nbsp; </Checkbox>
        <Checkbox value="green"> 0010 &nbsp; </Checkbox>
        <Checkbox value="blue"> 0100 &nbsp; </Checkbox>
        <Checkbox value="blue"> 1200 &nbsp; </Checkbox>
        <div style={{ marginBottom: '2px' }} />
        <Checkbox value="red"> 0000 &nbsp; </Checkbox>
        <Checkbox value="yellow"> 0001 &nbsp; </Checkbox>
        <Checkbox value="green"> 0010 &nbsp; </Checkbox>
        <Checkbox value="blue"> 0100 &nbsp; </Checkbox>
        <Checkbox value="blue"> 1200 &nbsp; </Checkbox>
        <div style={{ marginBottom: '2px' }} />
        <Checkbox value="red"> 0000 &nbsp; </Checkbox>
        <Checkbox value="yellow"> 0001 &nbsp; </Checkbox>
        <Checkbox value="green"> 0010 &nbsp; </Checkbox>
        <Checkbox value="blue"> 0100 &nbsp; </Checkbox>
        <Checkbox value="blue"> 1200 &nbsp; </Checkbox>
        <div style={{ marginBottom: '2px' }} />
        <Checkbox value="red"> 0000 &nbsp; </Checkbox>
        <Checkbox value="yellow"> 0001 &nbsp; </Checkbox>
        <Checkbox value="green"> 0010 &nbsp; </Checkbox>
        <Checkbox value="blue"> 0100 &nbsp; </Checkbox>
        <Checkbox value="blue"> 1200 &nbsp; </Checkbox>
        <div style={{ marginBottom: '2px' }} />
        <Checkbox value="red"> 0000 &nbsp; </Checkbox>
        <Checkbox value="yellow"> 0001 &nbsp; </Checkbox>
        <Checkbox value="green"> 0010 &nbsp; </Checkbox>
        <Checkbox value="blue"> 0100 &nbsp; </Checkbox>
        <Checkbox value="blue"> 1200 &nbsp; </Checkbox>
        <div style={{ marginBottom: '20px' }} />
          
        <hr style={{borderTop: '3px solid #B9B8B8'}} />
        <div style={{ marginBottom: '10px' }} />
        상/하차:   <SelectBox options={LOAD} defaultValue="all" />
        <div style={{ marginBottom: '10px' }} />
        <hr style={{borderTop: '3px solid #B9B8B8'}} />
        <div style={{ marginBottom: '10px' }} />
        운행 여부:   <SelectBox options={OPERATION} defaultValue="all" />
        <div style={{ marginBottom: '10px' }} />

          </CardTitle>
        </ListGroup>
      <div className="Button">
      <ApplyButton>Apply</ApplyButton>
      </div>
      </CardBody>
    </Card>
  );
};

export default Options;
