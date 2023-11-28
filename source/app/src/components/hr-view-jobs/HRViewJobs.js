import "./HRJobCreation.scss";
import { Component } from "react";
import { NavLink } from "react-router-dom";

export default class HRViewJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hrDetails: {name:""},
          password: "",
          showErrorMessage: false
        };
      }

    render() {
        return (
            <div id="home-role-buttons-container">
                <label id='HR_Name'>Welcome, {this.props.hrDetails.name}</label>
                <NavLink to={"/hr-view-jobs"}>
                    <div className="home-role-button">View Posted Jobs</div>
                </NavLink>
                <NavLink to={"/hr-job-create"}>
                    <div className="home-role-button">Post New Job</div>
                </NavLink>
                <hr/>
            </div>
           
        )
    }
}