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
                { name: "", battleWinner: 0 },
                { name: "", battleWinner: 0 }
            ],
            winner: "",
            gameStatus: 0
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.beginGame = this.beginGame.bind(this);
        this.addRound = this.addRound.bind(this);
        this.getRoundResults = this.getRoundResults.bind(this);
    }

    handleInputChange(event) {
        let players = Object.assign({}, this.state.players);
        var target = event.target;
        var index = target.name;
        players[index].name = target.value;
        this.setState({ players });
    }

    beginGame() {
        this.addRound();
        this.setState({ gameStatus: 1 });
    }

    addRound() {
        let rounds = Object.assign([], this.state.rounds);
        rounds.push({});
        this.setState({ rounds });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    getRoundResults(finishedRound) {
        if (finishedRound.finished === 1) {
            let rounds = Object.assign([], this.state.rounds);
            rounds.splice(rounds.length - 1, 1, finishedRound);
            if (finishedRound.winnerIndex > -1) {
                let players = Object.assign([], this.state.players);
                if (++players[finishedRound.winnerIndex].wonRounds === 3) {
                    players[finishedRound.winnerIndex].battleWinner = 1;
                } else {
                    rounds.push({ finished: 0 });
                }
                this.setState({ players });
                console.log(players);
            }
            this.setState({ rounds });
            console.clear();
            console.log(rounds);
        }
    };

    render() {
        let gameRounds, playersNamesForm;
        if (this.state.gameStatus === 1) {
            gameRounds = <GameRounds players={this.state.players} gameFinishedCallback={this.getRoundResults} />
        } else {
            playersNamesForm = 
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <form onSubmit={this.handleSubmit}>
                            <input maxlength="25" name="0" type="text" className="form-control mb-2" placeholder="First warrior's name" value={this.state.players[0].name} onChange={this.handleInputChange} />
                            <input maxlength="25" name="1" type="text" className="form-control mb-2" placeholder="Second warrior's name" value={this.state.players[1].name} onChange={this.handleInputChange} />
                        </form>
                    <button disabled={!this.state.players[0].name || !this.state.players[1].name} className="btn btn-primary form-control" onClick={this.beginGame}><GiCrestedHelmet size="1.3em" /> Valar Morghulis</button>
                    </div>
                </div>
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

                {playersNamesForm}
                {gameRounds}
            </div>
        );
    }
}
