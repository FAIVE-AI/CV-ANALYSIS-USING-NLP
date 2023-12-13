import "./CandidateHeader.scss";
import { Component } from "react";
import { NavLink } from "react-router-dom";

export default class CandidateHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="candidate-header-container">
        <NavLink
          to={"/candidate-home"}
          className={({ isActive, isPending }) =>
            isPending ? "header-navigation-button" : isActive ? "header-navigation-button-active" : ""
          }
        >
          <div className="header-navigation-button">My Profile</div>
        </NavLink>
        <NavLink
          to={"/open-jobs"}
          className={({ isActive, isPending }) =>
            isPending ? "header-navigation-button" : isActive ? "header-navigation-button-active" : ""
          }
        >
          <div className="header-navigation-button">Open Jobs</div>
        </NavLink>
        <NavLink
          to={"/my-applications"}
          className={({ isActive, isPending }) =>
            isPending ? "header-navigation-button" : isActive ? "header-navigation-button-active" : ""
          }
        >
          <div className="header-navigation-button">My Applications</div>
        </NavLink>
      </div>
    );
  }
}
