import { NavLink } from "react-router-dom";
import "./LoginRegister.scss";
import { Component } from "react";
import { AuthService } from "../../services/auth-service";

export default class LoginRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      showErrorMessage: false,
      candidateDetails: null,
      hrDetails: {}
    };
  }

  updateTextBox = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  authenticateUser = (type) => {
    const method =
      type === "candidate"
        ? AuthService.candidateLogin
        : AuthService.hrExecLogin;

    method({
      id: this.state.id,
      password: this.state.password
    }).then((response) => {
      if (response.ok) {
        console.log(response);
        response.json().then((result) => {
          console.log(result);
          this.setState(
            {
              candidateDetails: result.candidateDetails
            },
            () => {
              this.props.setCandidate(result.candidateDetails);
              setTimeout(() => {
                document.getElementById("login-register-nav-button").click();
              }, 1000);
            }
          );
        });
      } else {
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
      }
    });
  };

  render() {
    return (
      <div id="login-register-container">
        <h1>FAIVE - AI-Based Job Portal</h1>
        {this.props.isCandidate && (
          <div id="login-register-sub-header">
            We will help you find your best job:
          </div>
        )}
        {!this.props.isCandidate && (
          <div id="login-register-sub-header">
            We will find the best talent for your job:
          </div>
        )}
        <div className="login-register-field-container">
          <label
            className="login-register-label"
            id="login-register-id-label"
            htmlFor="login-register-id-input"
          >
            User ID:
          </label>
          <input
            autoComplete="off"
            id="login-register-id-input"
            className="login-register-input"
            name="id"
            type="text"
            value={this.state.id}
            onChange={this.updateTextBox}
          ></input>
        </div>
        <div className="login-register-field-container">
          <label
            className="login-register-label"
            id="login-register-password-label"
            htmlFor="login-register-password-input"
          >
            Password:
          </label>
          <input
            autoComplete="off"
            id="login-register-password-input"
            className="login-register-input"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.updateTextBox}
          ></input>
        </div>
        {this.props.isCandidate && (
          <div id="login-register-button-container">
            <div
              onClick={() => this.authenticateUser("candidate")}
              className="login-register-button"
            >
              Login
            </div>
            <NavLink
              id="login-register-register-navlink"
              to={"/candidate-register"}
            >
              <div className="login-register-button">Register</div>
            </NavLink>
          </div>
        )}
        {!this.props.isCandidate && (
          <div id="login-register-button-container">
             <NavLink
             id="login-register-register-navlink"
             to={"/hr-view-jobs"}>
            <div
              onClick={() => this.authenticateUser("hr-exec")}
              className="login-register-button"
            >
              Login
            </div>
           </NavLink>
          </div>
        )}
        {this.state.showErrorMessage && (
          <p id="login-register-error-message">
            Invalid User ID, Password or a problem with the server. Please try
            again.
          </p>
        )}

        <NavLink
          id="login-register-login-navlink"
          to={this.props.isCandidate ? "/candidate-home" : "/hr-exec-home"}
        >
          <button id="login-register-nav-button" type="button">
            Navigate
          </button>
        </NavLink>
      </div>
    );
  }
}
