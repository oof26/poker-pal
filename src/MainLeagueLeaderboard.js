import React, {Component} from 'react';
import './Tournaments.css'
class MainLeagueLeaderboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            leaderboardEntry:[
                { ranking: 1, name: 'Oisin', points: 12 },
                { ranking: 2, name: 'James', points: 11 },
                { ranking: 3, name: 'Jake', points: 10 },
                { ranking: 4, name: 'Lucy', points: 9 }
            ]
        }
    }
    sortBy(key){
        //SORT DATA 
    }
    renderTableData(){
        return this.state.leaderboardEntry.map((student,index) => {
            const {id, name, ranking, points} = student  
            return(
                <tr key={id}>
                    <td>{ranking}</td>
                    <td>{name}</td>
                    <td>{points}</td>
                </tr>
            )
        })
    }
    renderTableHeader() {
        let header = Object.keys(this.state.leaderboardEntry[0])
        return header.map((key, index) => {
           return <th key={index} onClick = {() => this.sortBy(key.toUpperCase())}>{key.toUpperCase()}</th>
        })
     }
    render(){
        return (
            <div>
               <table id='leaderboardEntry'>
                  <tbody>
                     <tr>{this.renderTableHeader()}</tr>
                     {this.renderTableData()}
                  </tbody>
               </table>
            </div>
         )
    }
}

export default MainLeagueLeaderboard