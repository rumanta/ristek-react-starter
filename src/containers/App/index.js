/* eslint-disable */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from './theme';
import { routes } from './routes';

export default class App extends React.Component {
  render() {
    const pages = routes.map(route => (
      <Route
        component={route.component}
        exact={route.exact}
        path={route.path}
      />
    ));

    return (
      <ThemeProvider theme={theme}>
        <Switch>
          {pages}
        </Switch>
      </ThemeProvider>
    );
  }
}