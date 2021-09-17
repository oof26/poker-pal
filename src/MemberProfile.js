import * as React from "react";
import Cookies from 'universal-cookie';

import profilePicture from "./profilePicPlaceholder.jpg"
import medal from "./medal.png"
import dunce from "./Dunce.png"
import nine from "./9.png"
import fifty from "./50.png"
import ProfileComparison from './ProfileComparison'

import './Tournaments.css';

export function MemberProfile() {
    var hPlace = 10
    var cPlace = 10
    var lastUpdate = "11/10/20"
    var pHistory = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label : 'Place History',
            backgroundColor: '#0013ae',
            borderColor: '#0013ae',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    };
    return (
        <div className="App">
            <div className="side-custom-header">
                <b>Profile</b>
            </div>

            <div className="">
                <div className="leftSection">
                    <GetUserName/>
                    <img src={profilePicture} className="profile-picture" alt="profilePicture" align="left" width="175" height="175" />

                    <div className="sub-section-header">
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <b>Badges</b>
                    </div>
                    <img src={medal} className="circle" alt="circle" align="left"/>
                    <img src={dunce} className="circle" alt="circle" align="left"  />
                    <img src={nine} className="circle" alt="circle" align="left"  />
                    <img src={fifty} className="circle" alt="circle" align="left"  />

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <link id="pagestyle" rel="stylesheet" type="text/css" href="App.css"/>
                    <p id="button" onClick="ChangeContrast('AppContrast.css')">
                        <div className="button">
                            <b>High contrast mode</b>
                        </div>
                    </p>

                </div>

                <div className="memberRightSection">
                    <div className="smaller-text">
                        <p><strong>Compare with other Players</strong></p>
                        <ProfileComparison/>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.onload = function() {
    document.getElementById("button").onclick = ChangeContrast;
};


function ChangeContrast(sheet) {
    document.body.style.fontWeight= "bolder";
    document.body.style.fontSize = "200px";
    document.getElementById('pagestyle').setAttribute('href', sheet);
}



window.onload = function() {
    document.getElementById("button").onclick = ChangeContrast;
};

/*function Reload(){
    window.location.reload(true)
}*/

function ChangeContrast(sheet){
    document.body.style.background= "#FCFF90";
    document.body.style.fontWeight= "bold";
    document.getElementById('pagestyle').setAttribute('href', sheet);
}

function GetUserName(){
    const cookies = new Cookies();
    console.log(cookies.get('userName'));
    let name = cookies.get('userName');
    return (
      <div className="sub-section-header">
        <b>{name}</b>
      </div>
    )
}


// TODO - REPLICATE FOR GetBalance, GetNumWins
function GetRank(){
    const cookies = new Cookies();
    console.log(cookies.get('userID')); // TODO - REMOVE WHEN DONE TESTING
    let userID = cookies.get('userID');

    const method = "GET";
    const leagueID = 1;
    let url = "http://localhost:5000/"+leagueID+"/user/"+userID;

    let request = new XMLHttpRequest();
    let filePath = "";
    // TODO - GET CURRENT RANK FROM MAIN LEAGUE
    //request.open('GET', "http://localhost:5000/"+"user"+"/"+"1", true); // TODO - REPLACE WITH LINE ABOVE
    request.open(method, url, true);
    let rank;
    request.onload = function(){
        let data = JSON.parse(this.response);
        let rank = data.rank;
        if (data.error == null) {
            console.log(data);
            let rank = data.value.totalScore;// TODO - SET AS DATA.RANK WHEN BACKEND COMPLETED

            const cookies = new Cookies(); // TODO - DECIDE IF COOKIES HAVE TO BE SET HERE
            cookies.set('mainLeagueStanding', rank, { path: '/' });
        }
        return (
          <div className="smaller-text">
              <p>rank = {rank}</p>
          </div>
        )
    };
    request.send();

    return ( // this is currently getting returned, not ideal. TODO - sort. Could be that a cookie is set then read immediately
      <div className="smaller-text">
          <p>rank = {""}</p>
      </div>
    )
}


function GetBalance(){

    const cookies = new Cookies();
    /*cookies.set('myCat', 'Pacman', { path: '/' });*/
    console.log(cookies.get('userName'));
    let name = cookies.get('userName');
    return (
        <div className="sub-section-header">
            <b>{name}</b>
        </div>
    )
}


function GetNumWins(){

    const cookies = new Cookies();
    /*cookies.set('myCat', 'Pacman', { path: '/' });*/
    console.log(cookies.get('userName'));
    let name = cookies.get('userName');
    return (
        <div className="sub-section-header">
            <b>{name}</b>
        </div>
    )
}