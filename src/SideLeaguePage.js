import React from "react";
import axios from 'axios'

import SmallSLLeaderboard from './smallSLLeaderboard'
import SideLeagueGraph from './SideLeagueGraph.js'
import Cookies from 'universal-cookie';

import './Tournaments.css';

export function SideLeaguePage() {
    const cookies = new Cookies();
    let userID  = cookies.get('userID');
    let userName = cookies.get('userName');
    let hPlace = 10 //NEED TO GET FROM API
    let lastUpdate = "11/10/20"
    return (
        <div className="Tournament">
            <body>
                <div>
                    <div className="tournamentLeftSection">
                        <BalanceValues/>
                        <p><strong>Win Streak</strong></p>
                        <WinStreak/>
                        <p><strong>Last Updated</strong></p>
                        <LastUpdated/>
                        <p>
                            <button className="session-button" >
                                <a href="/adminOptions" className="tournamentLink">Add Session Data</a>
                            </button>
                        </p>
                    </div>
                    <div className="tournamentRightSection">
                            <p><strong>Balance History </strong></p>
                            <SideLeagueGraph/>
                            <p>
                            <strong>Leaderboard </strong></p>
                            <SmallSLLeaderboard/>
                    </div>
                </div>
            </body>
        </div>
    );
}

class LastUpdated extends React.Component{
    constructor(props){
        super(props);
        let cookies = new Cookies();
        this.state = {
            lastUpdate: "User has not joined any sessions",
            userID: cookies.get('userID')
        }
    }
    
    async componentDidMount(){
        axios.get('http://localhost:5000/users/'+this.state.userID+'/sessions/')
          .then((response) => {
              let sessions = response.data.value
              let recentSession = new Date(response.data.value[response.data.value.length-1].startDate)
              this.setState({lastUpdate: recentSession.toDateString()});
          }, (error) => {
            console.log(error);
          });
    }

    render(){
        return(
            <p>
                {this.state.lastUpdate}
            </p>
        );
    }
}

class WinStreak extends React.Component{
  constructor(props){
    super(props);
    var cookies = new Cookies();
    this.state = {
        streak: 0,
        WL: "user is not on a streak",
        userID: cookies.get('userID')
    }
  }

    async componentDidMount(){
        this.setState({currPlace:2})
        axios.get('http://localhost:5000/users/'+this.state.userID+'/streak/1')
          .then((response) => {
              this.setState({
                  streak: response.data.value.streak,
                  WL: response.data.value.streakType
                });
          }, (error) => {
            console.log(error);
          });

    }

    render(){
        return(
            <p>
                {this.state.streak + " " + this.state.WL}
            </p>
        );
    }
}

class BalanceValues extends React.Component{
    constructor(props){
        super(props);
        var cookies = new Cookies();
        this.state = {
            highBal: "User has not joined any sessions",
            currBal: "User has not joined any sessions",
            userID: cookies.get('userID')
        }
    }
    
    async componentDidMount(){
        this.setState({currPlace:2})
        axios.get('http://localhost:5000/leagues/2/user/'+this.state.userID+'/history')
          .then((response) => {
              var sessions = response.data.value
              var currBalance = response.data.value[sessions.length-1].totalScore
              var maxBal = sessions.reduce((max, p) => p.totalScore > max ? p.totalScore : max, sessions[0].totalScore); //Formula I stole online to get max place not sure if/how it works
              this.setState({
                  highBal: maxBal,
                  currBal: currBalance
                });
          }, (error) => {
            console.log(error);
          });
        
    }
    render(){
        return(
            <div>
                <p><strong>Current Balance</strong></p>
                <p>
                    {this.state.currBal}
                </p>
                <p><strong>Highest Balance</strong></p>
                <p>
                    {this.state.highBal}
                </p>
            </div>
           
        );
    }
}