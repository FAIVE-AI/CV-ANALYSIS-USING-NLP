import "./CandidateHome.scss";
import { Component } from "react";

export default class CandidateHome extends Component {
  render() {
    return (
      <div id="candidate-register-container">
        <h1>FAIVE - AI-Based Job Portal</h1>
        <div className="candidate-register-field-container">
          <label
            className="candidate-register-label"
            id="candidate-register-name-label"
            htmlFor="candidate-register-name-input"
          >
            Name:
          </label>
          <input
            autoComplete="off"
            id="candidate-register-name-input"
            className="candidate-register-input"
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.updateTextBox}
            disabled
          ></input>
        </div>
        <div className="candidate-register-field-container">
          <label
            className="candidate-register-label"
            id="candidate-register-email-label"
            htmlFor="candidate-register-email-input"
          >
            Email ID:
          </label>
          <input
            autoComplete="off"
            id="candidate-register-email-input"
            className="candidate-register-input"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.updateTextBox}
            disabled
          ></input>
        </div>
        <div id="candidate-register-score-section">
          <div className="candidate-register-score-item">
            <label
              className="candidate-register-label"
              id="candidate-register-personality-test-label"
            >
              Personality:
            </label>
            <label>According to our AI system, your personality types are: </label>
          </div>
          <div className="candidate-register-score-item">
            <label
              className="candidate-register-label"
              id="candidate-register-aptitude-test-label"
            >
              Aptitude:
            </label>
            <label>This is your aptitude score: </label>
          </div>
        </div>

        <div id="candidate-register-save-button">
          <div
            onClick={this.viewJobs}
            className="candidate-register-button"
          >
            Create
          </div>
        </div>
        <input
          onChange={this.uploadFile}
          type="file"
          id="candidate-register-resume-input"
          accept=".pdf"
        ></input>
        {this.state.showErrorMessage && (
          <p id="candidate-register-error-message">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    );
  }
}
