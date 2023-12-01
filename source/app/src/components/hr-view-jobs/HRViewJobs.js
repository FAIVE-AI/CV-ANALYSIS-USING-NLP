import "./HRViewJobs.scss";
import { Component } from "react";
import { HRService } from "../../services/hr-portal-service";
import { NavLink } from "react-router-dom";

export default class HRViewJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hrDetails: {name:""},
          showErrorMessage: false
        };
    }

    postJob = (type) => {
        const method =HRService.viewjob
    
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
                        <span id = "hr-button" className="hr-nav-button-container hr-view">View Posted Jobs</span>
                    </a>
                    <a href="/hr-job-create">
                        <span id = "hr-button" className="hr-nav-button-container hr-post">Post New Job</span>
                    </a>
                </div>
                <hr/>
            </div>    
  
        )
    }
}