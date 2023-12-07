import "./HrRanklist.scss";
import { Component } from "react";
import serverConfig from "../../serverConfig.json";

const authEndpoint = serverConfig.SERVER_URL + "/auth";

export default class HrRanklist extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          listData: [],
          listData1: [],
          selectedJobId: null,
        };
      }

    
      componentDidMount() {
        this.fetchData();
      }
    
      fetchData = async () => {
        try {
          const response = await fetch(authEndpoint + "/hr-ranklist", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
        
          const data = await response.json();
          console.log(data)
          this.setState({
            listData: data,
  
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
    fetchCandidateList = async (jobId) => {
      try {
        const response1 = await fetch(authEndpoint + `/candidate-list/${jobId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data1 = await response1.json();
        this.setState({
          listData1: data1,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

    handleJobIdClick = (jobId) => {
     // Handle the click event for the Job ID
      this.setState({ selectedJobId: jobId.value }, () => {
       // After setting the state, fetch candidate list for the selected job ID
        this.fetchCandidateList(jobId.value);
      });
      console.log(jobId.value)
    };
   
    renderTableData() {
        // Render the table rows with data
        return this.state.listData.map((item, index) => {
          const values = Object.values(item);
          const jobId = values.find((value, index) => Object.keys(item)[index] === 'ID');
          return (
            <tr key={index}>
              {values
                .filter((value, index) => ['ID','Title', 'JobLocation','LastDate'].includes(Object.keys(item)[index]))
                .map((value, index) => (
                  <td onClick={() => this.handleJobIdClick(jobId)} key={index}>{typeof value === 'object' ? value.value : value}</td>
                ))}
            </tr>
          );
        });
      }
    
    renderTableData1() {
      // Render the table rows with data
      return this.state.listData1.map((item, index) => {
       const filteredValues = ['FitmentRank', 'CandidateName', 'Skills', 'MatchPercent']
       
       .map(key => item[key]);

    return (
      <tr key={index}>
        {filteredValues.map((value, index) => (
          <td key={index}>{typeof value === 'object' ? value.value : value}</td>
        ))}
      </tr>
        )});
      }
   

  render() {
    return (
      <div>
        <p id="ranklist-text">
          Below are the jobs posted by you that are used to be closed
        </p>
        <table>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Position</th>
              <th>Location</th>
              <th>Last Date</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
        {/* created by PC */}
        <p id="ranklist-text">Considerable Candidates</p>
        <table>
          <thead>
          <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Skills </th>
                    <th>SystemScore</th>
                    
                </tr>
          </thead>
          <tbody>{this.renderTableData1()}</tbody>
        </table>
      </div>
    );
  }
}
