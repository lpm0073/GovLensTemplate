import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";
import APIService from "./APIService.js";
import Table from "react-bootstrap/Table";

class MyTable extends React.Component {
  static defaultProps = {
    pagination: {
      page: 1,
      perPage: 2
    },
    sort: {
      field: "id",
      order: "DESC"
    },
    filter: {}
  };
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: true
    };
  }
  componentDidMount() {
    APIService("GET_LIST", "agencies", this.props).then(agencies => {
      this.setState({
        data: agencies["data"],
        isLoading: false
      });
    });
  }

  render() {
    if (this.state.isLoading) return null;
    return (
      <div className="column">
        <h2 className="subtitle">
          Showing <strong>{this.state.data.length} items</strong>
        </h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {Object.entries(this.state.data[0]).map(el => (
                <th key={key(el)}>{el[0]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(el => (
              <tr key={el.id}>
                {Object.entries(el).map(el => (
                  <td key={key(el)}>{el[1]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default MyTable;
