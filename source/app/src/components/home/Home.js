import { Component } from "react";
import './Home.scss';

export default class Home extends Component {
    render() {
        return (
            <div id="home-container">
                <h1>FAIVE - AI-Based Job Portal</h1>
                <div id="home-sub-header">
                    Login / Register with your role:
                </div>
                <div id="home-role-buttons-container">
                    <div className="home-role-button">
                        Job-Seeker
                    </div>
                    <div className="home-role-button">
                        HR-Executive
                    </div>
                </div>
            </div>
        )
    }
}