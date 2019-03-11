import React, { Component } from 'react';
import axios from 'axios';
import { Button, Loading, Dialog } from 'element-react';
import { Animated } from "react-animated-css";
import * as moment from 'moment';

export class Statistics extends Component {
    static displayName = Statistics.name;

    constructor(props) {
        super(props);
        this.state = { winners: [], loading: true, pages: [], dlgGamesVisible: false, currentGames: [] };

        this.retrievePage = this.retrievePage.bind(this);
        this.renderWinnersTable = this.renderWinnersTable.bind(this);
        this.showGames = this.showGames.bind(this);
    }

    componentDidMount() {
        this.retrievePage(1);
    }

    showGames(games) {
        console.clear();
        console.log(games);
        this.setState({ dlgGamesVisible: true, currentGames: games });
    }

    retrievePage(page) {
        this.setState({ winners: [], loading: true, pages: [] });
        axios.get(`api/god?page=${page}&pageSize=10`)
            .then(res => {
                console.log(res.data);
                this.setState({ winners: res.data[0], loading: false, pages: res.data[1] });
            });
    }

    renderWinnersTable() {
        return (
            <div>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={!this.state.loading}>
                    <h5>Hall of Fame</h5>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Wins</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.winners.map(winner =>
                                <tr key={winner.name}>
                                    <td>{winner.name}</td>
                                    <td>{winner.wonGames.length}</td>
                                    <td><button onClick={this.showGames.bind(this, winner.wonGames)} className="btn btn-primary">Details</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Animated>

                <Dialog
                    showClose={false}
                    title="Games"
                    size="tiny"
                    visible={this.state.dlgGamesVisible}
                    lockScroll={false}
                >
                    <Dialog.Body>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Datetime</th>
                                    <th>Rounds</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.currentGames.map(game =>
                                    <tr key={'game-' + game.id}>
                                        <td><td>{moment(game.datetime).format('YYYY/MM/DD HH:MM')}</td></td>
                                        <td>{game.rounds}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button type="primary" onClick={() => this.setState({ dlgGamesVisible: false })}>Close</Button>
                    </Dialog.Footer>
                </Dialog>

            </div>
            
        );
    }

    render() {
        let contents = this.state.loading
            ? <p className="mt-2"><Loading text="Loading data"></Loading></p>
            : this.renderWinnersTable(this.state.winners, this.state.pages);

        return (
            <div>
                {contents}
                <div className="text-center">
                    {this.state.pages.map(page =>
                        <Button onClick={this.retrievePage.bind(this, page)} key={page} className="mb-4 btn btn-default btn-xs text-light">Page {page}</Button>
                    )}
                </div>
            </div>
        );
    }
}
