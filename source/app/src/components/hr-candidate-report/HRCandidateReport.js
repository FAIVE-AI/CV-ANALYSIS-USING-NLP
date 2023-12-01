import "./HRCandidateReport.scss";
import { Component } from "react";
import { HRCandidateReportService } from "../../services/candidate-report-service";

export default class HRCandidateReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            candidateDetails:{name:""}
          };
      }

      candidateReport = (name) => {
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
            document.getElementById("send-email-button").click();
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
                    <label name='candidate-name' id="candidate-name">{this.props.candidateDetails.name}</label>
                </div>
                <div className="table-container">
                    <table>
                    <thead>
                        <tr>
                            <th className="table-header">Skillset Score :</th>
                            <th className="table-header">Personality Compatibility :</th>
                            <th className="table-header">Aptitude Score :</th>
                            <th className="table-header">Overall Score :</th>
                        </tr>
                    </thead>
                    <tbody> 
                      <td className="table-content">{this.props.skillsetscore}</td>
                      <td className="table-content">{this.props.personalityscore}</td>
                      <td className="table-content">{this.props.aptitudescore}</td>
                      <td className="table-content">{this.props.overallscore}</td>
                    </tbody>
                    </table>
                </div>
                <div>
                  <span>
                    <label>Skillset :</label>
                    <input 
                    type="text"
                    readonly
                    placeholder={this.state.skillset.toString()}
                    ></input>
                  </span>
                  <span>
                    <label>Personality Type :</label>
                    <input 
                    type="text"
                    readonly
                    placeholder={this.state.personality.toString()}
                    ></input>
                  </span>
                  <span>
                    <label>Experience :</label>
                    <input 
                    type="text"
                    readonly
                    placeholder={this.state.experience.toString()}
                    ></input>
                  </span>
                </div>
                <div>
                 <label>Personality Description :</label>
                 <input 
                    type="text"
                    multiline
                    readonly
                    placeholder={this.state.personalitydescription.toString()}
                    ></input>
                </div>
                <div>
                  <button>Send Interview Invite</button>
                  <button>Remove</button>
                </div>
            </div>    
        )
    }
}