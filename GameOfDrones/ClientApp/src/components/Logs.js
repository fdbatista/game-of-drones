import React, { Component } from 'react';
import axios from 'axios';
import { Loading, Button } from 'element-react';
import { Animated } from "react-animated-css";
import * as moment from 'moment';

export class Logs extends Component {
    static displayName = Logs.name;

    constructor(props) {
        super(props);
        this.state = { loading: true, items: [], pages: [] };
        this.retrievePage = this.retrievePage.bind(this);
        this.renderItemsTable = this.renderItemsTable.bind(this);
    }

    componentDidMount() {
        this.retrievePage(1);
    }

    retrievePage(page) {
        this.setState({ loading: true, items: [], pages: [] });
        axios.get(`api/logs?page=${page}&pageSize=10`)
            .then(res => {
                this.setState({ items: res.data[0], loading: false, pages: res.data[1] });
            });
    }

    renderItemsTable() {
        return (
            <div>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={!this.state.loading}>
                    <h5>Logs</h5>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Datetime</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.items.map(item =>
                                <tr key={item.id}>
                                    <td>{moment(item.datetime).format('YYYY/MM/DD HH:MM')}</td>
                                    <td><span className={item.isError == 1 ? 'text-danger' : 'text-primary'}>{item.isError == 1 ? 'Error' : 'Information'}</span></td>
                                    <td>{item.description}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Animated>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p className="mt-2"><Loading text="Loading data"></Loading></p>
            : this.renderItemsTable(this.state.items, this.state.pages);

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
