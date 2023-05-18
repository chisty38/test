import './App.css';
import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { BASE_API, MIDDLEWARE } from './api';
import { inputs } from './Data/SalesFormInput';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { format, startOfWeek, endOfWeek } from "date-fns";
import FormInput from './formInput/FormInput';
import TableMTD from './formInput/TableMTD';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


function App() {
    var usaTime = format(new Date(), "yyyy-MM-dd").toLocaleString("en-US", {
        timeZone: "America/New_York",
      });
      const [testShipmentData, setTestShipmentData] = useState([]);
      const [rowCount, setRowCount] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({
        fromDate: usaTime,
        toDate: usaTime,
        year: new Date().getFullYear(),
        month: new Date().toLocaleString("en-US", { month: "long" }).toUpperCase(),
        param: ''
      });

      //fetch data by date param
      const fetchDataByDateRange = async (from, to) => {
        setIsLoading(true);
        const salesLogByDateRange = await fetch(
          `${BASE_API}/${MIDDLEWARE}/getshipmentStatusbydate/` +
            from +
            "/" +
            to
        )
          .then((res) => res.json())
          .then(function (result) {
            console.log(result);
            setRowCount(result.length);
            return result;
          });
          setTestShipmentData(salesLogByDateRange);
          setIsLoading(false);
      };
      const columns_SalesLog = useMemo(() => [
        {
          accessorKey: "trackingnumber", //access nested data with dot notation
          header: "Tracking number",
          size: 130,
        },
        {
          accessorKey: "shipmentdate", //access nested data with dot notation
          header: "Shipment Date",
          size: 120,
        },
        {
          accessorKey: "event",
          header: "Status",
          size: 100,
        },
        {
          accessorKey: "eventdt",
          header: "Event Date",
          size: 120,
        },
      ]);

useEffect(() => {

  }, []);


  return (
    <div class="container-fluid" id="testContainer">
      <Container>
        <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
            <h2 className='pageHeader'>Shipment Status Report</h2>
            </Col>
        </Row>
        <Row id="testContainer_Header">
        
        <Col xs={12} sm={12} md={12} lg={2}>
        {inputs.map(
            (input) =>
              input.name === "fillDate" && (
                  <FormInput
                    key={input.id}
                    showLabel={true}
                    {...input}
                    value={values.fromDate}
                    data-toggle="tooltip"
                    data-placement="right"
                    title={"From Date"}
                    onChange={(e) => {
                      setValues({ ...values, fromDate: e.target.value });
                    }}
                  />
              )
          )}
        </Col>
        <Col xs={12} sm={12} md={12} lg={2}>
        {inputs.map(
            (input) =>
              input.name === "fillDate" && (
                  <FormInput
                    key={"todate"}
                    showLabel={true}
                    {...input}
                    value={values.toDate}
                    data-toggle="tooltip"
                    data-placement="right"
                    title={"To Date"}
                    onChange={(e) => {
                      setValues({ ...values, toDate: e.target.value });
                    }}
                  />
              )
          )}
          </Col>
          <Col xs={12} sm={12} md={12} lg={2} id='testContainer_Col'>
          <button
              class="btn btn-secondary"
              id="testContainer_ByDate"
              type="button"
              data-toggle="tooltip"
              data-placement="right"
              title="Click to refresh date range"
              //disabled={props.Role === REACT_APP_Role_Admin ? false : true}
              onClick={() => {
                fetchDataByDateRange(values.fromDate, values.toDate);
                console.log();
              }}
            >Search by Date
            </button>
          </Col>
          </Row>
          <Row id="testContainer_Table">
          <TableMTD
            enableGrouping
            columns={columns_SalesLog}
            data={testShipmentData}
            isLoading={isLoading}
            enablePagination={false}
            initialState={{
                density: "compact",
              }}
            refresh={() => {
              setValues({ ...values, toDate: usaTime, fromDate: usaTime, param:'' });
              fetchDataByDateRange(usaTime, usaTime);
            }}
            Title='Shipment Status'
          />
        </Row>
          </Container>
      </div>  
  );
}
export default App;
