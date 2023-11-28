import "./HRJobCreation.scss";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { JobPostingService } from "../../services/job-posting-service";

export default class HRJobCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hrDetails: {name:""},
          password: "",
          showErrorMessage: false
        };
      }

      postJob = (type) => {
        const method =
          JobPostingService.jobPosting
    
        method({
          title: this.state.title,
          joblocation: this.state.joblocation,
          lastdate:this.state.lastdate,
          wages: this.state.wages,
          jobdescription:this.state.jobdescription,
          jobqualification:this.state.jobqualification
        }).then((response) => {
          if (response.ok) {
            document.getElementById("post-job-nav-button").click();
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
                    <label name='hr-name'>Welcome, {this.props.hrDetails.name}</label>
                    <NavLink to={"/hr-view-jobs"}>
                        <span id = "hr-nav-button" className="hr-nav-bar-container">View Posted Jobs</span>
                    </NavLink>
                    <NavLink to={"/hr-job-create"}>
                        <span id = "hr-nav-button" className="hr-nav-bar-container">Post New Job</span>
                    </NavLink>
                </div>
                <hr/>
                <div>
                    <div className="job-desc-field-container">
                        <label className='desc_titles'>Title : </label>
                        <input 
                        editable
                        autoComplete="on"
                        className = "job-posting-input"
                        name="title"
                        type="text"
                        maxLength={40}
                        // value={value}
                        ></input>
                    </div>
                    <div className="job-desc-field-container">
                        <label className='desc_titles'>Location : </label>
                        <select className = "job-posting-input">
                            <option>Toronto</option>
                            <option>Vancouver</option>
                            <option>Montreal</option>
                        </select>
                    </div>
                    <div className="job-desc-field-container">
                        <label className='desc_titles'>Last Date To Apply : </label>
                        <input 
                        editable
                        className = "job-posting-input"
                        name="lastDate"
                        type="date"
                        maxLength={40}
                        // value={value}
                        ></input>
                    </div>
                    <div className="job-desc-field-container">
                        <label className='desc_titles'>Compensation : </label>
                        <input
                        editable
                        className = "job-posting-input"
                        name="lastDate"
                        type="number"
                        placeholder = "$"
                        maxLength={8}
                        // value={value}
                        ></input>
                    </div>
                    <div className="job-desc-field-container">
                        <label className='desc_titles'>Job Description : </label>
                        <textarea 
                        editable
                        className = "job-posting-multi-input"
                        name="jobDescription"
                        type="text"
                        multiline
                        numberOfLines={10}
                        maxLength={400}
                        // value={value}
                        ></textarea>
                    </div>
                    <div className="job-desc-field-container">
                        <label className='desc_titles'>Job Qualifications : </label>
                        <textarea 
                        editable
                        className = "job-posting-multi-input"
                        name="jobQualification"
                        type="text"
                        multiline
                        numberOfLines={10}
                        maxLength={400}
                        // value={value}
                        ></textarea>
                    </div>
                    <div id="job-post-button-container">
                        <button 
                        onClick={() => this.postJob()}
                        className="job-post-button" 
                        > 
                        Post 
                        </button>
                    </div>
                </div>
            </div>    
        )
    }
}