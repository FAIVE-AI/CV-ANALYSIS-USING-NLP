import "./HRExecHome.scss";
import { Component } from "react";
import { JobService } from "../../services/job-service";

export default class HRExecHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
      jobApplicantList: [],
      selectedJob: null,
      selectedCandidate: null
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
    this.setState(
      {
        selectedJob: job,
        selectedCandidate: null
      },
      () => {
        JobService.getAllJobCandidates(job.id).then((response) =>
          response.json().then((result) => {
            for (let i = 0; i < result.length; i++) {
              result[i].rank = i + 1;
            }
            this.setState({
              jobApplicantList: result
            });
          })
        );
      }
    );
  };

  selectCandidate = (candidate) => {
    this.setState({
      selectedCandidate: candidate
    });
  };

  render() {
    return (
      <div id="hr-exec-home-container">
        <h2 className="hr-exec-home-title">Below are the open positions:</h2>
        <div id="hr-exec-home-table-container">
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
                        ? "hr-exec-home-table-row-selected"
                        : "hr-exec-home-table-row"
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
          <div id="hr-exec-home-candidate-table-container">
            <h3 className="hr-exec-home-title">
              Here are the candidates for the selected job:
            </h3>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Skills</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {this.state.jobApplicantList.map((candidate, index) => {
                  return (
                    <tr
                      key={index}
                      className={
                        candidate === this.state.selectedCandidate
                          ? "hr-exec-home-table-row-selected"
                          : "hr-exec-home-table-row"
                      }
                      onClick={() => this.selectCandidate(candidate)}
                    >
                      <td>{candidate.rank}</td>
                      <td>{candidate.candidateName}</td>
                      <td>{candidate.skills}</td>
                      <td>{candidate.matchPercent}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {this.state.selectedCandidate && (
          <div id="hr-exec-home-job-description-container">
            <h2>{this.state.selectedCandidate.candidateName}</h2>
            <div id="hr-exec-home-job-description">
              <div>Skill Set: {this.state.selectedCandidate.skills}</div>
              <div>
                Aptitude Score: {this.state.selectedCandidate.aptitudeScore}
              </div>
              <div>Experience: {this.state.selectedCandidate.experience}</div>
              <div>Personality: {this.state.selectedCandidate.personality}</div>
              <div>Score: {this.state.selectedCandidate.matchPercent}</div>
              <div id="hr-exec-home-job-description-button-row">
                <button id="hr-exec-home-job-apply-btn" onClick={this.applyJob}>
                  Call for Interview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
