import { Grid, MuiThemeProvider, Button } from "@material-ui/core";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "../src";
import Typography from "@material-ui/core/Typography";
import csv from 'csv';
import Papa from 'papaparse/papaparse.min';
import { CSVLink, CSVDownload } from "react-csv";

let direction = "ltr";
const theme = createMuiTheme({
  direction: direction,
  palette: {
    type: "light",
  },
});

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      columns: [
        { title: 'Name', field: 'Name' },
        { title: 'Age', field: 'Age' },
        { title: 'DOB', field: 'DOB'},
        { title: 'Reporting Manager', field: 'ReportingManager'},
        { title: 'Salary Department', field: 'SalaryDepartment'},
      ],
      data: [
        {
          Name: 'Lala',
          Age: '20',
          DOB: '23/12/1994',
          ReportingManager: 'Test',
          SalaryDepartment: 'Test',
        },
		{
          Name: 'Ross',
          Age: '21',
          DOB: '01/02/1994',
          ReportingManager: 'Test1',
          SalaryDepartment: 'Test1',
        },
		{
          Name: 'Rachel',
          Age: '22',
          DOB: '23/11/1995',
          ReportingManager: 'Test2',
          SalaryDepartment: 'Test2',
        },
		{
          Name: 'Monica',
          Age: '23',
          DOB: '23/10/1996',
          ReportingManager: 'Test3',
          SalaryDepartment: 'Test3',
        },
		{
          Name: 'Joey',
          Age: '24',
          DOB: '13/10/1999',
          ReportingManager: 'Test4',
          SalaryDepartment: 'Test4',
        },
		{
          Name: 'Phoebe',
          Age: '25',
          DOB: '03/04/1992',
          ReportingManager: 'Test5',
          SalaryDepartment: 'Test5',
        },
		{
          Name: 'Chandler',
          Age: '26',
          DOB: '23/12/1994',
          ReportingManager: 'Test6',
          SalaryDepartment: 'Test6',
        },
		{
          Name: 'Mike',
          Age: '27',
          DOB: '23/12/1994',
          ReportingManager: 'Test7',
          SalaryDepartment: 'Test7',
        },
		{
          Name: 'Christine',
          Age: '20',
          DOB: '23/12/1994',
          ReportingManager: 'Test8',
          SalaryDepartment: 'Test8',
        },
		{
          Name: 'Geller',
          Age: '20',
          DOB: '23/12/1994',
          ReportingManager: 'Test9',
          SalaryDepartment: 'Test9',
        },
		{
          Name: 'Buffay',
          Age: '20',
          DOB: '23/12/1994',
          ReportingManager: 'Test10',
          SalaryDepartment: 'Test10',
        },
		{
          Name: 'Bing',
          Age: '20',
          DOB: '23/12/1994',
          ReportingManager: 'Test11',
          SalaryDepartment: 'Test11',
        },
      ],
    }
    this.importCSV = this.importCSV.bind(this);
  }
  tableRef = React.createRef();
  
  importCSV(evt) {
	const that = this;
    if ( !(evt.target && evt.target.files && evt.target.files[0]) ) {
        return;
    }    
    Papa.parse(evt.target.files[0], {
        header: true,
        dynamicTyping: true,
        complete: function (result) {
			console.log(result.data);
			that.setState({
				data: result.data
			  })
        }
    });
  };
  
  getFileName() {
    let dformat = new Date().getTime();
    return "CSVUpload_" + dformat + ".csv";
  }
  
  colRenderCount = 0;
   
  state = {
    text: "text",
    selecteds: 0,
  };

  render() {
	const { data } = this.state;
	
	const csvData = [
	  ["Name", "Age", "DOB", "ReportingManager", "SalaryDepartment"]
	];
	
	
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <div style={{ maxWidth: "100%", direction }}>
            <Grid container>
              <Grid item xs={12}>
                {this.state.selectedRows && this.state.selectedRows.length}
				
				 <input type="file" id="fileElem"  multiple accept=".csv" style = {{ top: "19px", left: "700px", zIndex: "100", color: "#fff", backgroundColor: "#0b5ed7", borderColor: "#0a58ca", position : "relative"}} className={`btn btn-sm`} onChange={this.importCSV.bind(this)}/>
					<CSVLink
					filename="Blank CSV.csv"
					data={csvData}
					className={`btn btn-md`}
					style = {{zIndex:"1", color: "#fff", backgroundColor: "#0b5ed7", borderColor: "#0a58ca",
					position: "absolute", top: "18px", left: "500px"}}>Export Blank CSV</CSVLink>
                <MaterialTable
                  tableRef={this.tableRef}
                  columns={this.state.columns}
                  data={this.state.data}
                  title="CSV Uploader"
				  style={{top: "-34px"}}
                  onFilterChange={(appliedFilter) => {
                    console.log("selected Filters : ", appliedFilter);
                  }}
                  
                  options={{
					exportFileName: this.getFileName(),
				    exportButton: true,
                    tableLayout: "fixed",
                    columnResizable: false,
                    headerSelectionProps: {
                      color: "primary",
                    },
					headerStyle: { backgroundColor : "#3C8DBC", color : "#fff", fontFamily: "Verdana", fontSize: "16px"}
                  }}
                  // editable={{
                  //   onBulkUpdate: (changedRows) =>
                  //     new Promise((resolve, reject) => {
                  //       console.log(changedRows);
                  //       setTimeout(() => {
                  //         {
                  //           /* const data = this.state.data;
                  //           data.push(newData);
                  //           this.setState({ data }, () => resolve()); */
                  //         }
                  //         resolve();
                  //       }, 1000);
                  //     }),
                  //   onRowAdd: (newData) =>
                  //     new Promise((resolve, reject) => {
                  //       setTimeout(() => {
                  //         {
                  //           /* const data = this.state.data;
                  //           data.push(newData);
                  //           this.setState({ data }, () => resolve()); */
                  //         }
                  //         resolve();
                  //       }, 1000);
                  //     }),
                  //   onRowUpdate: (newData, oldData) =>
                  //     new Promise((resolve, reject) => {
                  //       setTimeout(() => {
                  //         {
                  //           /* const data = this.state.data;
                  //           const index = data.indexOf(oldData);
                  //           data[index] = newData;
                  //           this.setState({ data }, () => resolve()); */
                  //         }
                  //         resolve();
                  //       }, 1000);
                  //     }),
                  //   onRowDelete: (oldData) =>
                  //     new Promise((resolve, reject) => {
                  //       setTimeout(() => {
                  //         {
                  //           /* let data = this.state.data;
                  //           const index = data.indexOf(oldData);
                  //           data.splice(index, 1);
                  //           this.setState({ data }, () => resolve()); */
                  //         }
                  //         resolve();
                  //       }, 1000);
                  //     }),
                  // }}
                  localization={{
                    body: {
                      emptyDataSourceMessage: "No records to display",
                      filterRow: {
                        filterTooltip: "Filter",
                        filterPlaceHolder: "Filtaaer",
                      },
                    },
                  }}
                  onSearchChange={(e) => console.log("search changed: " + e)}
                  
                />
              </Grid>
            </Grid>
            {/* <MaterialTable
              title={
                <Typography variant="h6" color="primary">
                  Remote Data Preview
                </Typography>
              }
              columns={[
                {
                  title: "Avatar",
                  field: "avatar",
                  render: (rowData) => (
                    <img
                      style={{ height: 36, borderRadius: "50%" }}
                      src={rowData.avatar}
                    />
                  ),
                },
                {
                  title: "Id",
                  field: "id",
                  filterOnItemSelect: true,
                  filterPlaceholder: "placeholder",
                  lookup: {
                    1: "1",
                    2: "2",
                    3: "3",
                    4: "4",
                    5: "5",
                    6: "6",
                    7: "7",
                    8: "8",
                    9: "9",
                    10: "10",
                    11: "11",
                    12: "12",
                  },
                },
                { title: "First Name", field: "first_name" },
                { title: "Last Name", field: "last_name" },
              ]}
              options={{
                filtering: true,
                grouping: true,
                groupTitle: (group) => group.data.length,
                searchFieldVariant: "outlined",
              }}
              localization={{
                toolbar: {
                  searchPlaceholder: "Outlined Search Field",
                },
              }}
              data={(query) =>
                new Promise((resolve, reject) => {
                  let url = "https://reqres.in/api/users?";
                  url += "per_page=" + query.pageSize;
                  url += "&page=" + (query.page + 1);
                  console.log(query);
                  fetch(url)
                    .then((response) => response.json())
                    .then((result) => {
                      resolve({
                        data: result.data,
                        page: result.page - 1,
                        totalCount: result.total,
                      });
                    });
                })
              }
            /> */}
          </div>
        </MuiThemeProvider>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

module.hot.accept();
