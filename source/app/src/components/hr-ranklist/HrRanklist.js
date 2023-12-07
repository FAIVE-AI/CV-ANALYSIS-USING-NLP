import "./HrRanklist.scss";
import { Component } from "react";
import { AuthService } from "../../services/auth-service";
import serverConfig from "../../serverConfig.json";

const authEndpoint = serverConfig.SERVER_URL + "/auth";

export default class HrRanklist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listData: [],
      listData1: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(authEndpoint + "/hr-ranklist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const response1 = await fetch(authEndpoint + "/candidate-list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      const data1 = await response1.json();
      console.log(data);
      this.setState({
        listData: data,
        listData1: data1
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  renderTableData() {
    // Render the table rows with data
    return this.state.listData.map((item, index) => {
      const values = Object.values(item);

      return (
        <tr key={index}>
          {values
            .filter((value, index) =>
              ["ID", "Title", "JobLocation", "LastDate"].includes(
                Object.keys(item)[index]
              )
            )
            .map((value, index) => (
              <td key={index}>
                {typeof value === "object" ? value.value : value}
              </td>
            ))}
        </tr>
      );
    });
  }
  renderTableData1() {
    // Render the table rows with data
    return this.state.listData1.map((item, index) => {
      const values1 = Object.values(item);

      return (
        <tr key={index}>
          {values1
            .filter((value, index) =>
              ["JobID", "CandidateID", "FitmentRank", "MatchPercent"].includes(
                Object.keys(item)[index]
              )
            )
            .map((value, index) => (
              <td key={index}>
                {typeof value === "object" ? value.value : value}
              </td>
            ))}
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <p id="ranklist-text">
          Below are the jobs posted by you that are used to be closed
        </p>
        <table>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Position</th>
              <th>Location</th>
              <th>Last Date</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
        {/* created by PC */}
        <p id="ranklist-text">Considerable Candidates</p>
        <table>
          <thead>
            <tr>
              <th>JobID</th>
              <th>CandidateID</th>
              <th>FitmentRank</th>
              <th>MatchPercent</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData1()}</tbody>
        </table>
      </div>
    );
  }
}
