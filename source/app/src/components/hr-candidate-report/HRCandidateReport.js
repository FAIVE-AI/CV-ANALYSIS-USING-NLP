import "./HRCandidateReport.scss";
import { Component } from "react";
import { HRCandidateReportService } from "../../services/candidate-report-service";

export default class HRCandidateReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: []
          };
      }

      candidateReport = (type) => {
        const method =HRCandidateReportService.candidateReport
    
        method({
          name: this.state.name,
          skillsetscore: this.state.skillsetscore,
          personalityscore:this.state.personalityscore,
          aptitudescore: this.state.aptitudescore,
          overallscore:this.state.overallscore,
          skillset:this.state.skillset,
          personality:this.state.personality,
          experience:this.state.experience,
          personalitydescription:this.state.personalitydescription,
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
      renderTableData() {
        // Render the table rows with data
        return this.state.listData.map((item, index) => {
          const performanceScores = Object.values(item);
          return (
            <tr key={index}>
                {performanceScores
                  .filter((value, index) => ['skillsetScore','personalityCompatabilityScore','AptitudeScore', 'overallScore'].includes(Object.keys(item)[index]))
                  .map((value, index) => (
                    <td key={index}>{typeof value === 'object' ? value.value : value}</td>
                  ))}
              </tr>
            );
          });
        }
    render() {
        return (
            <div>
                <div id="header-container">
                    <label name='candidate-name' id="candidate-name">{this.props.candidateDetails.name}</label>
                </div>
                <div className="table-sontainer">
                    <table>
                    <thead>
                        <tr>
                            <th className="table-header">Skillset Score :</th>
                            <th className="table-header">Personality Compatibility :</th>
                            <th className="table-header">Aptitude Score :</th>
                            <th className="table-header">Overall Score :</th>
                        </tr>
                    </thead>
                    <tbody> {this.renderTableData()}</tbody>
                    </table>
                </div>





                    {/* <a href="/hr-view-jobs">
                        <span id = "hr-nav-button" className="hr-nav-bar-container">View Posted Jobs</span>
                    </a>
                    <a href="/hr-job-create">
                        <span id = "hr-nav-button" className="hr-nav-bar-container">Post New Job</span>
                    </a> */}
                
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