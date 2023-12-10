import "./HRJobCreation.scss";
import { Component } from "react";
import { HRService } from "../../services/hr-portal-service";
import { NavLink } from "react-router-dom";

export default class HRJobCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hrDetails: {name:""},
          title: "",
          joblocation: "",
          lastdate:"",
          salary:"",
          jobdescription:"",
          jobqualification:""
        };
      }

      updateTextBox = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
      postJob = (type) => {
        const method =HRService.jobPosting
    
        method({
          title: this.state.title,
          joblocation: this.state.joblocation,
          lastdate:this.state.lastdate,
          salary: this.state.salary,
          jobdescription:this.state.jobdescription,
          jobqualification:this.state.jobqualification
        }).then((response) => {
          if (response.ok) {
            document.getElementById("hr-post-job-button").click();
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
            <div>
                <div id="header-container">
                    <label name='hr-name' id = "hr-name">Welcome, {this.props.hrDetails.name}</label>
                    <a href="/hr-view-jobs">
                        <span id = "hr-button" className="hr-nav-button-container hr-view-create-page">View Posted Jobs</span>
                    </a>
                    <a href="/hr-job-create">
                        <span id = "hr-button" className="hr-nav-button-container hr-post-create-page">Post New Job</span>
                    </a>
                </div>
                <hr/>
                <div id="hr-form-body-container">
                    <div className="job-field-container">
                        <label 
                        className='hr-form-label' 
                        htmlFor="job-post-title"
                        >Title : </label>
                        <input 
                        editable
                        autoComplete="on"
                        className = "job-posting-input"
                        id = "job-post-title"
                        name="title"
                        type="text"
                        maxLength={40}
                        value={this.state.title}
                        onChange={this.updateTextBox}
                        ></input>
                    </div>
                    <div className="job-field-container">
                        <label 
                        className='hr-form-label'
                        htmlFor="job-post-location"
                        >Location : </label>
                        <select 
                        className = "job-posting-input"
                        id="job-post-location"
                        value={this.state.joblocation}
                        onChange={this.updateTextBox}>
                            <option>Toronto</option>
                            <option>Vancouver</option>
                            <option>Montreal</option>
                        </select>
                    </div>
                    <div className="job-field-container">
                        <label 
                        className='hr-form-label'
                        htmlFor="job-post-last-date">Last Date To Apply : </label>
                        <input 
                        editable
                        className = "job-posting-input"
                        name="lastDate"
                        type="date"
                        maxLength={40}
                        id="job-post-last-date"
                        value={this.state.lastdate}
                        onChange={this.updateTextBox}
                        ></input>
                    </div>
                    <div className="job-field-container">
                        <label 
                        className='hr-form-label'
                        htmlFor="job-post-Salary">Salary : </label>
                        <input
                        editable
                        className = "job-posting-input"
                        name="lastDate"
                        type="number"
                        placeholder = "$"
                        maxLength={8}
                        id="job-post-Salary"
                        value={this.state.salary}
                        onChange={this.updateTextBox}
                        ></input>
                    </div>
                    <div className="job-field-container">
                        <label className='hr-form-label'
                        htmlFor="job-post-description">Job Description : </label>
                        <textarea 
                        editable
                        className = "job-posting-multi-input"
                        name="jobDescription"
                        type="text"
                        multiline
                        numberOfLines={10}
                        maxLength={400}
                        id="job-post-description"
                        value={this.state.jobdescription}
                        onChange={this.updateTextBox}
                        ></textarea>
                    </div>
                    <div className="job-field-container">
                        <label className='hr-form-label'
                        id="job-post-qualifications">Job Qualifications : </label>
                        <textarea 
                        editable
                        className = "job-posting-multi-input"
                        name="jobQualification"
                        type="text"
                        multiline
                        numberOfLines={10}
                        maxLength={400}
                        id="job-post-qualifications"
                        value={this.state.jobqualification}
                        onChange={this.updateTextBox}
                        ></textarea>
                    </div>
                    {(
                    <div id="job-post-button-container">
                      <div
                        onClick={() => this.postJob()}
                        id = "hr-button" 
                        className="hr-submit" >Post
                      </div>
                    </div>
                    )}  
                    {this.state.showErrorMessage && (
                      <p id="job-posting-error-message">
                         This job posting already exists!!
                      </p>
                    )}                  
                    <NavLink
                    id="post-job-navlink"
                    to={"/hr-view-jobs"}>
                      <button hidden id="hr-post-job-button" type="button">
                        Navigate
                      </button>
                    </NavLink>
                </div>
            </div>    
        )
    }
}