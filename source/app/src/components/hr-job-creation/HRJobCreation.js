import "./HRJobCreation.scss";
import { Component } from "react";
import { NavLink } from "react-router-dom";

export default class HRJobCreation extends Component {
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
            <div >
                <div id="home-role-buttons-container">
                    <label id='HR_Name'>Welcome, {this.props.hrDetails.name}</label>
                    <NavLink to={"/hr-view-jobs"}>
                        <div className="hr-page-button">View Posted Jobs</div>
                    </NavLink>
                    <NavLink to={"/hr-job-create"}>
                        <div className="hr-page-button">Post New Job</div>
                    </NavLink>
                    <hr/>
                </div>
                <div>
                    <span>
                        <label class='desc_titles'>Title: </label>
                        <input 
                        editable
                        autoComplete="on"
                        name="title"
                        type="text"
                        maxLength={40}
                        // value={value}
                        ></input>
                    </span>
                    <span>
                        <label class='desc_titles'>Location: </label>
                        <select>
                            <option>Toronto</option>
                            <option>Vancouver</option>
                            <option>Montreal</option>
                        </select>
                    </span>
                    <span>
                        <label class='desc_titles'>Last Date To Apply: </label>
                        <input 
                        editable
                        name="lastDate"
                        type="date"
                        maxLength={40}
                        // value={value}
                        ></input>
                    </span>
                    <span>
                        <label class='desc_titles'>Compensation: </label>
                        <input
                        editable
                        name="lastDate"
                        type="date"
                        maxLength={40}
                        // value={value}
                        ></input>
                    </span>
                    <span>
                        <label class='desc_titles'>Job Description: </label>
                        <textarea 
                        editable
                        name="jobDescription"
                        type="text"
                        multiline
                        numberOfLines={10}
                        maxLength={400}
                        // value={value}
                        ></textarea>
                    </span>
                    <span>
                        <label class='desc_titles'>Qualifications: </label>
                        <textarea 
                        editable
                        name="jobQualification"
                        type="text"
                        multiline
                        numberOfLines={10}
                        maxLength={400}
                        // value={value}
                        ></textarea>
                    </span>
                    <button id='submit'> Post </button>
                </div>
            </div>    
        )
    }
}