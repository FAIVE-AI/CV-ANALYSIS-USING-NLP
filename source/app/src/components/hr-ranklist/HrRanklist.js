import "./HrRanklist.scss";
import { Component } from "react";

export default class HrRanklist extends Component {
    render() {
        return (
            <div>

            <p id ="ranklist-text">Below are the jobs posted by you that are used to be closed</p>
            <table>
                <tr>
                    <th>Job ID</th>
                    <th>Position</th>
                    <th>Number of Positions</th>
                    <th>Last Date</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>01/01/2024</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                    <td>01/01/2024</td>
                </tr>
                <tr>
                    <td>Ernst Handel</td>
                    <td>Roland Mendel</td>
                    <td>Austria</td>
                    <td>01/01/2024</td>
                </tr>
                <tr>
                    <td>Island Trading</td>
                    <td>Helen Bennett</td>
                    <td>UK</td>
                    <td>01/01/2024</td>
                </tr>
                <tr>
                    <td>Laughing Bacchus Winecellars</td>
                    <td>Yoshi Tannamuri</td>
                    <td>Canada</td>
                    <td>01/01/2024</td>
                </tr>
                <tr>
                    <td>Magazzini Alimentari Riuniti</td>
                    <td>Giovanni Rovelli</td>
                    <td>Italy</td>
                    <td>01/01/2024</td>
                </tr>
                
                </table>

            </div>
        )
    }
}