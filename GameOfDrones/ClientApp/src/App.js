import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Statistics } from './components/Statistics';
import { NewGame } from './components/NewGame';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/new-game' component={NewGame} />
        <Route path='/statistics' component={Statistics} />
      </Layout>
    );
  }
}
