import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import { GiSpinningSword } from 'react-icons/gi';

export class GameRounds extends Component {
    static displayName = GameRounds.name;

    constructor(props) {
        super(props);

        this.state = {
            currentPlayerIndex: 0,
            weapons: ["Rock", "Paper", "Scissors"],
            rounds: [],
            currentRound: { weapons: ["", ""], winner: "", finished: 0 },
            gameFinished: 0,
            playerVictories: [0, 0]
        };

        this.handleChange = this.handleChange.bind(this);
        this.setWeapon = this.setWeapon.bind(this);
        this.difference = this.difference.bind(this);
        this.renderFinishedRounds = this.renderFinishedRounds.bind(this);
        this.getGameWinnerIndex = this.getGameWinnerIndex.bind(this);
    }

    setWeapon() {
        if (this.state.currentPlayerIndex < Object.keys(this.props.players).length - 1) {   //This is player 1 choosing a weapon
            this.setState({ currentPlayerIndex: this.state.currentPlayerIndex + 1 });   //We set the index for player 2
        } else {
            let currentRound = Object.assign({}, this.state.currentRound);
            let winnerIndex, difference = this.difference(currentRound.weapons[0], currentRound.weapons[1]);    //We calculate the difference between the chosen weapons' indices
            if (difference === 1) {
                winnerIndex = currentRound.weapons[0] > currentRound.weapons[1] ? 0 : 1;    //If they picked consecutive weapons, the lowest index wins the round
            }
            else if (difference > 1) {
                winnerIndex = currentRound.weapons[0] < currentRound.weapons[1] ? 0 : 1;    //If the difference is greater than 1, the highest index wins
            } else {
                winnerIndex = -1    //Otherwise, the round ends with a tie because they selected the same weapon
            }
            currentRound.weapons[0] = this.state.weapons[currentRound.weapons[0]];    //Setting weapon name instead of its index
            currentRound.weapons[1] = this.state.weapons[currentRound.weapons[1]];    //Setting weapon name instead of its index
            currentRound.winnerIndex = winnerIndex;
            currentRound.winner = winnerIndex > -1 ? this.props.players[winnerIndex].name : "Tie";
            currentRound.finished = 1;
            this.setState({ currentRound });

            let rounds = Object.assign([], this.state.rounds);
            rounds.push(currentRound);
            currentRound = { weapons: ["", ""], winner: "", finished: 0 };
            this.setState({ currentRound });
            this.setState({ currentPlayerIndex: 0 });
            this.setState({ rounds });

            let gameWinnerIndex = this.getGameWinnerIndex(rounds);
            if (gameWinnerIndex >= 0) {
                this.props.finishedGameCallback({ gameWinnerIndex: gameWinnerIndex, rounds: rounds.length });
            }
        }
    }

    getGameWinnerIndex(rounds) {
        let res = [0, 0];
        let i;
        for (i in rounds) {
            let round = rounds[i];
            if (round.winnerIndex !== -1) {
                res[round.winnerIndex]++;
                if (res[round.winnerIndex] > 2) {
                    return round.winnerIndex;
                }
            }
        }
        console.clear();
        console.log(rounds);
        console.log(res);
        return -1;
    }

    difference(a, b) {
        return Math.abs(a - b);
    }

    handleChange(event) {
        let round = Object.assign({}, this.state.currentRound);
        round.weapons[this.state.currentPlayerIndex] = parseInt(event.target.value, 10);
        this.setState({ round });
    }

    renderFinishedRounds() {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Winner</th>
                        <th>Weapons</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.rounds.map((round, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><span className={round.winnerIndex !== -1 ? "text-primary" : "text-warning"}>{round.winner}</span></td>
                            <td>{round.weapons[0] + ' vs ' + round.weapons[1]}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let weaponForm;
        if (this.state.gameFinished === 0) {
            weaponForm =
                <div className="row">
                    <div className="col-sm-12 col-lg-5 bordered mt-2">
                        <Animated animationIn="fadeIn">
                            <div>
                                <span className="badge default text-light text-uppercase">Round {this.state.rounds.length + 1}</span>
                                <h5>{this.props.players[this.state.currentPlayerIndex].name}</h5>
                                <hr />
                                <select className="form-control mb-2" value={this.state.currentRound.weapons[this.state.currentPlayerIndex]} onChange={this.handleChange}>
                                    <option defaultValue value="">Select a weapon</option>
                                    {
                                        this.state.weapons.map((item, index) => {
                                            return (
                                                <option key={index} value={index}>{item}</option>
                                            )
                                        })
                                    }
                                </select>
                                <button disabled={this.state.currentRound.weapons[this.state.currentPlayerIndex] === ""} className="btn btn-primary form-control" onClick={this.setWeapon}><GiSpinningSword size="1.3em" /> OK</button>
                            </div>
                        </Animated>
                    </div>
                    <div className="col-sm-12 mt-2 col-lg-5 offset-lg-2 bordered mt-2">
                        {this.renderFinishedRounds()}
                    </div>
                </div>
        }
        return (
            <div className="container">
                {weaponForm}
            </div>
        );
    }
}
