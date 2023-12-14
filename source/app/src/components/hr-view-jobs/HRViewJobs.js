import "./HRViewJobs.scss";
import { Component } from "react";
import { HRService } from "../../services/hr-portal-service";
import { NavLink } from "react-router-dom";
import serverConfig from "../../serverConfig.json";

const authEndpoint = serverConfig.SERVER_URL + "/hr-actions";

export default class HRViewJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hrDetails: { name: "" },
      candidateDetails: {
        name: "",
        skillsetscore: "",
        personalityscore: "",
        aptitudescore: "",
        overallscore: "",
        personalitydescription: "",
        skillset: "",
        personality: "",
        experience: ""
      },
      jobDetails: { jobTitle: "" },
      listData: [],
      listData1: [],
      showErrorMessage: false
    };
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

  scheduleInterview = () => {
    this.setState(
      {
        showErrorMessage: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            showErrorMessage: false
          });
        }, 5000);
      }
    );
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

  /* created by PC */
  render() {
    return (
      <div>
        <div id="header-container">
          <label name="hr-name" id="hr-name">
            Welcome, {this.props.hrDetails?.hrName}
          </label>
          <a href="/hr-view-jobs">
            <span
              id="hr-button"
              className="hr-nav-button-container hr-view-posting-page"
            >
              View Posted Jobs
            </span>
          </a>
          <a href="/hr-job-create">
            <span
              id="hr-button"
              className="hr-nav-button-container hr-post-posting-page"
            >
              Post New Job
            </span>
          </a>
        </div>
        <hr />
        <div id="hr-form-body-container">
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
          <p id="ranklist-text">
            Considerable Candidates for the job posting -{" "}
            {this.props.jobDetails.jobTitle}
          </p>
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
        <div>
          <div id="table-header-container">
            <label name="candidate-name">
              {this.props.candidateDetails.name}
            </label>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="table-header">Skillset Score </th>
                  <th className="table-header">Personality Compatibility </th>
                  <th className="table-header">Aptitude Score </th>
                  <th className="table-header">Overall Score </th>
                </tr>
              </thead>
              <tbody>
                <td className="table-content">
                  {this.props.candidateDetails.skillsetscore}
                </td>
                <td className="table-content">
                  {this.props.candidateDetails.personalityscore}
                </td>
                <td className="table-content">
                  {this.props.candidateDetails.aptitudescore}
                </td>
                <td className="table-content">
                  {this.props.candidateDetails.overallscore}
                </td>
              </tbody>
            </table>
          </div>
          <div class="personality-field-holder">
            <span>
              <label class="personality-label">Skillset :</label>
              <input
                type="text"
                disabled
                placeholder={this.props.candidateDetails.skillset}
              ></input>
            </span>
            <span>
              <label class="personality-label">Personality Type :</label>
              <input
                type="text"
                disabled
                placeholder={this.props.candidateDetails.personality}
              ></input>
            </span>
            <span>
              <label class="personality-label">Experience :</label>
              <input
                type="text"
                disabled
                placeholder={this.props.candidateDetails.experience}
              ></input>
            </span>
          </div>
          <div class="personality-description-field-holder">
            <label class="personality-label">Personality Description :</label>
            <input
              type="text"
              multiline
              disabled
              id="personality-container"
              placeholder={this.props.candidateDetails.personalitydescription}
            ></input>
          </div>
          <div id="job-post-button-container">
            {
              <div id="">
                <div
                  onClick={() => this.scheduleInterview()}
                  id="hr-button"
                  className="hr-submit"
                >
                  Send Interview Invite
                </div>
              </div>
            }
          </div>
          <div>
            {this.state.showErrorMessage && (
              <p id="job-scheduled-text">
                Interview has been scheduled for the candidate -{" "}
                {this.props.candidateDetails.name} for the position -{" "}
                {this.props.jobDetails.jobTitle}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
