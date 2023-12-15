import { NavLink } from "react-router-dom";
import { AuthService } from "../../services/auth-service";
import "./CandidateRegister.scss";
import { Component } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { AIService } from "../../services/ai-service";
import { ResumeService } from "../../services/resume-service";

export default class CandidateRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      aptitudeScore: null,
      resumePlainText: "",
      resume: {
        introduction: "",
        skills: "",
        education: "",
        experience: ""
      },
      personalityTypes: [],
      uploadedFileName: "",
      showErrorMessage: false
    };
    GlobalWorkerOptions.workerSrc =
      "//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.269/pdf.worker.min.mjs";
    this.handleRemoteMessage = this.handleRemoteMessage.bind(this);
  }

  componentDidMount() {
    window.addEventListener("message", this.handleRemoteMessage);
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.handleRemoteMessage);
  }

  handleRemoteMessage(event) {
    if (typeof event.data === "number")
      this.setState({
        aptitudeScore: event.data
      });
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
                      this.getPersonalityTypes();
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
          .split("EXPERIENCE")[0];
      case "experience":
        return this.state.resumePlainText.split("EXPERIENCE")[1];

      default:
        break;
    }
  };

  getPersonalityTypes = () => {
    AIService.getPersonalityTypes(this.state.resume.introduction).then(
      (response) => {
        response.json().then((result) => {
          let personalityTypes = [];
          if (result.prediction[0]) {
            personalityTypes.push("Extraversion");
          }
          if (result.prediction[1]) {
            personalityTypes.push("Agreeableness");
          }
          if (result.prediction[2]) {
            personalityTypes.push("Conscientiousness");
          }
          if (result.prediction[3]) {
            personalityTypes.push("Openness");
          }

          this.setState(
            {
              personalityTypes: personalityTypes
            },
            () => {
              console.log(this.state.personalityTypes);
            }
          );
        });
      }
    );
  };

  createCandidate = () => {
    const candidate = {
      candidateName: this.state.name,
      emailId: this.state.email,
      personalityTypes: this.state.personalityTypes.join(),
      aptitudeScore: this.state.aptitudeScore,
      loginPassword: this.state.password
    };
    AuthService.register(candidate).then((response) => {
      if (response.ok) {
        response.json().then((result) => {
          ResumeService.postResume({
            candidateId: result.candidateId,
            skills: this.state.resume.skills.trim(),
            personality: this.state.personalityTypes.join(),
            education: this.state.resume.education,
            experience: this.state.resume.experience.trimStart().split(" ")[0]
          }).then((response) => {
            if (response.ok) {
              response.json().then(() => {
                this.props.setCandidate(candidate);
                setTimeout(() => {
                  document
                    .getElementById("candidate-register-nav-button")
                    .click();
                }, 2000);
              });
            }
          });
        });
      }
    });
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
              id="candidate-register-aptitude-test-label"
            >
              Aptitude:
            </label>
            {!this.state.aptitudeScore && (
              <a
                id="candidate-register-aptitude-test-input"
                className="candidate-register-test-link"
                href="http://localhost:3000/AptitudeTest"
                target="_blank"
                rel="opener"
              >
                Take the test
              </a>
            )}
            {this.state.aptitudeScore && (
              <p>You scored {this.state.aptitudeScore} / 100</p>
            )}
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

        <NavLink
          id="candidate-register-login-navlink"
          to="/candidate-login"
          hidden
        >
          <button id="candidate-register-nav-button" type="button" hidden>
            Navigate
          </button>
        </NavLink>
      </div>
    );
  }
}
