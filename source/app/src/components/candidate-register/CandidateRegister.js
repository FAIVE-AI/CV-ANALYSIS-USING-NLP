import { AuthService } from "../../services/auth-service";
import "./CandidateRegister.scss";
import { Component } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

export default class CandidateRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      personalityScore: null,
      aptitudeScore: null,
      resumePlainText: "",
      resume: {
        introduction: "",
        skills: "",
        education: "",
        experience: ""
      },
      uploadedFileName: "",
      showErrorMessage: false
    };
    GlobalWorkerOptions.workerSrc =
      "//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.269/pdf.worker.min.mjs";
  }

  updateTextBox = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  uploadFileButtonClick = () => {
    document.getElementById("candidate-register-resume-input").click();
  };

  uploadFile = (e) => {
    console.log(e);
    const resume = document.getElementById("candidate-register-resume-input")
      .files[0];
    this.readFile(resume);
    this.setState({
      uploadedFileName: resume.name
    });
  };

  readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const typedarray = new Uint8Array(event.target.result);
      getDocument(typedarray).promise.then((pdf) => {
        let extractedText = "";
        const numPages = pdf.numPages;
        for (let i = 1; i <= numPages; i++) {
          pdf.getPage(i).then((page) => {
            page.getTextContent().then((pageText) => {
              pageText.items.forEach((textItem) => {
                extractedText += textItem.str + " ";
              });
              this.setState(
                {
                  resumePlainText: extractedText
                },
                () => {
                  console.log(this.state.resumePlainText);
                  this.setState(
                    {
                      resume: {
                        introduction: this.getResumeSection("introduction"),
                        skills: this.getResumeSection("skills"),
                        education: this.getResumeSection("education"),
                        experience: this.getResumeSection("experience")
                      }
                    },
                    () => {
                      console.log("intro", this.state.resume.introduction);
                      console.log("skills", this.state.resume.skills);
                      console.log("education", this.state.resume.education);
                      console.log("experience", this.state.resume.experience);
                    }
                  );
                }
              );
            });
          });
        }
      });
    };
    reader.readAsArrayBuffer(file);
  };

  getResumeSection = (sectionName) => {
    switch (sectionName) {
      case "introduction":
        return this.state.resumePlainText
          .split("INTRODUCTION")[1]
          .split("SKILLS")[0];
      case "skills":
        return this.state.resumePlainText
          .split("SKILLS")[1]
          .split("EDUCATION")[0];
      case "education":
        return this.state.resumePlainText
          .split("EDUCATION")[1]
          .split("E XPER IENCE")[0];
      case "experience":
        return this.state.resumePlainText.split("E XPER IENCE")[1];

      default:
        break;
    }
  };

  createCandidate = () => {
    const candidate = {
      candidateName: this.state.name,
      emailId: this.state.email,
      personalityScore: this.state.personalityScore,
      aptitudeScore: this.state.aptitudeScore,
      loginPassword: this.state.password
    };
    AuthService.register(candidate).then((response) => console.log(response));
  };

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
          ></input>
        </div>
        <div className="candidate-register-field-container">
          <label
            className="candidate-register-label"
            id="candidate-register-password-label"
            htmlFor="candidate-register-password-input"
          >
            Password:
          </label>
          <input
            autoComplete="off"
            id="candidate-register-password-input"
            className="candidate-register-input"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.updateTextBox}
          ></input>
        </div>
        <div id="candidate-register-score-section">
          <div className="candidate-register-score-item">
            <label
              className="candidate-register-label"
              id="candidate-register-resume-label"
              htmlFor="candidate-register-resume-input"
            >
              Resume:
            </label>
            <div
              onClick={this.uploadFileButtonClick}
              className="candidate-register-button"
            >
              Upload CV
            </div>
            {!this.state.uploadedFileName ? (
              <p>Please upload .pdf only</p>
            ) : (
              <p>{this.state.uploadedFileName}</p>
            )}
          </div>
          <div className="candidate-register-score-item">
            <label
              className="candidate-register-label"
              id="candidate-register-personality-test-label"
            >
              Personality:
            </label>
            <a
              id="candidate-register-personality-test-input"
              className="candidate-register-test-link"
              href="www.google.com"
              target="_blank"
            >
              Take the test
            </a>
          </div>
          <div className="candidate-register-score-item">
            <label
              className="candidate-register-label"
              id="candidate-register-aptitude-test-label"
            >
              Aptitude:
            </label>
            <a
              id="candidate-register-aptitude-test-input"
              className="candidate-register-test-link"
              href="www.google.com"
              target="_blank"
            >
              Take the test
            </a>
          </div>
        </div>

        <div id="candidate-register-save-button">
          <div
            onClick={this.createCandidate}
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
