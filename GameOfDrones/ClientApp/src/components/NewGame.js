import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import { GameRounds } from "./GameRounds";
import { GiCrestedHelmet } from 'react-icons/gi';

export class NewGame extends Component {
    static displayName = NewGame.name;

    constructor(props) {
        super(props);
        
        this.state = {
            players: [
                { name: "", gameWinner: 0, roundsWon: 0 },
                { name: "", gameWinner: 0, roundsWon: 0 }
            ],
            winner: "",
            gameStatus: 0
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.beginGame = this.beginGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.getGameResults = this.getGameResults.bind(this);
    }

    handleInputChange(event) {
        let players = Object.assign([], this.state.players);
        var target = event.target;
        var index = target.name;
        players[index].name = target.value;
        this.setState({ players });
    }

    beginGame() {
        this.setState({ gameStatus: 1 });
    }

    restartGame() {
        this.setState({players: [{ name: "", gameWinner: 0, roundsWon: 0 }, { name: "", gameWinner: 0, roundsWon: 0 }] });
        this.setState({ gameStatus: 0 });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    getGameResults(results) {
        console.clear();
        console.log(results);
        let players = Object.assign([], this.state.players);
        players[results.gameWinnerIndex].gameWinner = 1;
        players[results.gameWinnerIndex].roundsWon = results.rounds;
        this.setState({ players });
        this.setState({ gameStatus: 2 });
    };

    render() {
        let visibleForm;

        switch (this.state.gameStatus) {
            case 0:
                visibleForm =
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <form onSubmit={this.handleSubmit}>
                                <input maxLength="25" name="0" type="text" className="form-control mb-2" placeholder="First warrior's name" value={this.state.players[0].name} onChange={this.handleInputChange} />
                                <input maxLength="25" name="1" type="text" className="form-control mb-2" placeholder="Second warrior's name" value={this.state.players[1].name} onChange={this.handleInputChange} />
                            </form>
                            <button disabled={!this.state.players[0].name || !this.state.players[1].name} className="btn btn-primary form-control" onClick={this.beginGame}><GiCrestedHelmet size="1.3em" /> Valar Morghulis</button>
                        </div>
                    </div>
                break;
            case 1:
                visibleForm = <GameRounds players={this.state.players} finishedGameCallback={this.getGameResults} />
                break;
            case 2:
                visibleForm = 
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <h5>We have a WINNER!</h5>
                            <p>After {this.state.players[0].gameWinner === 1 ? this.state.players[0].roundsWon : this.state.players[1].roundsWon} rounds, <b>{this.state.players[0].gameWinner === 1 ? this.state.players[0].name : this.state.players[1].name}</b> has become the First of his/her Name!</p>
                            <button className="btn btn-primary" onClick={this.restartGame}><GiCrestedHelmet size="1.3em" /> Try again</button>
                        </div>
                    </div>
                break;
            default:
                break;
        }
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <Animated animationIn="slideInDown" animationOut="fadeOut">
                            <div>
                                <p>
                                    <i>"When you play the Game of Drones, you win or you die"</i> - <b>Cersei Dronnister</b>
                                </p>
                            </div>
                        </Animated>
                    </div>
                </div>

                {visibleForm}
            </div>
        );
    }
}
