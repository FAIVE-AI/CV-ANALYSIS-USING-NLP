import "./HRJobCreation.scss";
import { Component } from "react";
import { JobPostingService } from "../../services/job-posting-service";

export default class HRJobCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hrDetails: {name:""},
          showErrorMessage: false
        };
      }

      postJob = (type) => {
        const method =JobPostingService.jobPosting
    
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
                    <label name='hr-name' id = "hr-name">Welcome, {this.props.hrDetails.name}</label>
                    <a href="/hr-view-jobs">
                        <span id = "hr-button" className="hr-nav-button-container hr-view">View Posted Jobs</span>
                    </a>
                    <a href="/hr-job-create">
                        <span id = "hr-button" className="hr-nav-button-container hr-post">Post New Job</span>
                    </a>
                </div>
                <hr/>
                <div id="hr-form-body-container">
                    <div className="job-field-container">
                        <label className='hr-form-label'>Title : </label>
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
                    <div className="job-field-container">
                        <label className='hr-form-label'>Location : </label>
                        <select className = "job-posting-input">
                            <option>Toronto</option>
                            <option>Vancouver</option>
                            <option>Montreal</option>
                        </select>
                    </div>
                    <div className="job-field-container">
                        <label className='hr-form-label'>Last Date To Apply : </label>
                        <input 
                        editable
                        className = "job-posting-input"
                        name="lastDate"
                        type="date"
                        maxLength={40}
                        // value={value}
                        ></input>
                    </div>
                    <div className="job-field-container">
                        <label className='hr-form-label'>Compensation : </label>
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
                    <div className="job-field-container">
                        <label className='hr-form-label'>Job Description : </label>
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
                    <div className="job-field-container">
                        <label className='hr-form-label'>Job Qualifications : </label>
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
                        id = "hr-button" className="hr-submit"
                        > 
                        Post 
                        </button>
                    </div>
                </div>
            </div>    
        )
    }
}