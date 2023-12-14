import "./HrHeader.scss";
import { Component } from "react";
import { NavLink } from "react-router-dom";

export default class HRHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="hr-header-container">
        <h3>Welcome, {this.props.hrDetails?.hrName}</h3>
        <NavLink
          to={"/hr-exec-home"}
          className={({ isActive, isPending }) =>
            isPending
              ? "header-navigation-button"
              : isActive
              ? "header-navigation-button-active"
              : ""
          }
        >
          <div className="header-navigation-button">Home</div>
        </NavLink>
        <NavLink
          to={"/post-jobs"}
          className={({ isActive, isPending }) =>
            isPending
              ? "header-navigation-button"
              : isActive
              ? "header-navigation-button-active"
              : ""
          }
        >
          <div className="header-navigation-button">Post Jobs</div>
        </NavLink>
      </div>
    );
  }
}
