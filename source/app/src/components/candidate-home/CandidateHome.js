import "./CandidateHome.scss";
import { Component } from "react";

export default class CandidateHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="candidate-home-container">
        <h1>FAIVE - AI-Based Job Portal</h1>
        <div className="candidate-home-field-container">
          <label
            className="candidate-home-label"
            id="candidate-home-name-label"
            htmlFor="candidate-home-name-input"
          >
            Name:
          </label>
          <input
            autoComplete="off"
            id="candidate-home-name-input"
            className="candidate-home-input"
            name="name"
            type="text"
            value={this.props.candidateDetails?.name}
            disabled
          ></input>
        </div>
        <div className="candidate-home-field-container">
          <label
            className="candidate-home-label"
            id="candidate-home-email-label"
            htmlFor="candidate-home-email-input"
          >
            Email ID:
          </label>
          <input
            autoComplete="off"
            id="candidate-home-email-input"
            className="candidate-home-input"
            name="email"
            type="email"
            value={this.props.candidateDetails?.email}
            disabled
          ></input>
        </div>
        <div id="candidate-home-score-section">
          <div className="candidate-home-score-item">
            <label
              className="candidate-home-label"
              id="candidate-home-personality-test-label"
            >
              Personality:
            </label>
            <label>
              According to our AI system, your personality types are:{" "}
            </label>
          </div>
          <div className="candidate-home-score-item">
            <label
              className="candidate-home-label"
              id="candidate-home-aptitude-test-label"
            >
              Aptitude:
            </label>
            <label>This is your aptitude score: </label>
          </div>
        </div>
      </div>
    );
  }
}
