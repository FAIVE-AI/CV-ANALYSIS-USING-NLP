import { JobService } from "../../services/job-service";
import "./CandidateViewJobs.scss";
import { Component } from "react";

export default class CandidateViewJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
      selectedJob: null
    };
    this.getAllJobs();
  }

  getAllJobs = () => {
    JobService.getAllJobs().then((response) => {
      if (response.ok) {
        response.json().then((result) => {
          this.setState(
            {
              jobList: result
            },
            () => {
              console.log(this.state.jobList);
            }
          );
        });
      }
    });
  };

  selectJob = (job) => {
    this.setState({
      selectedJob: job
    });
  };

  applyJob = () => {
    JobService.applyJob(
      this.state.selectedJob.id,
      this.props.candidateDetails.id
    ).then((response) => {
      if (response.ok) {
        console.log("Applied");
      }
    });
  };

  render() {
    return (
      <div id="candidate-view-jobs-container">
        <h1 id="candidate-view-jobs-title">Here are the open positions:</h1>
        <div id="candidate-view-jobs-table-container">
          <table>
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Position</th>
                <th>Location</th>
                <th>Posted Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.jobList.map((job) => {
                return (
                  <tr
                    key={job.id}
                    className={
                      job === this.state.selectedJob
                        ? "candidate-view-jobs-table-row-selected"
                        : "candidate-view-jobs-table-row"
                    }
                    onClick={() => this.selectJob(job)}
                  >
                    <td>{job.id}</td>
                    <td>{job.title}</td>
                    <td>{job.location}</td>
                    <td>{new Date(job.postedDate).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {this.state.selectedJob && (
          <div id="candidate-view-jobs-job-description-container">
            <h2>
              {this.state.selectedJob.id} - {this.state.selectedJob.title}
            </h2>
            <div id="candidate-view-jobs-job-description">
              <div className="candidate-view-jobs-job-description-row">
                <div>Location: {this.state.selectedJob.location}</div>
                <div>Skills: {this.state.selectedJob.skills}</div>
              </div>
              <div className="candidate-view-jobs-job-description-row">
                <div>Education: {this.state.selectedJob.education}</div>
                <div>Experience: {this.state.selectedJob.experience}</div>
              </div>
              <div className="candidate-view-jobs-job-description-row">
                <div>Wage: {this.state.selectedJob.wages}</div>
                <div>
                  Last Date:{" "}
                  {new Date(
                    this.state.selectedJob.postedDate
                  ).toLocaleDateString()}
                </div>
              </div>
              <div id="candidate-view-jobs-job-description-button-row">
                <button
                  id="candidate-view-jobs-job-apply-btn"
                  onClick={this.applyJob}
                >
                  Apply!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
