// import 'intl';
// import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import Routes from './src/routes'
import { Provider as StateProvider } from 'react-redux'
import store from './src/redux/store'

export default function App() {
  return (
    <StateProvider store={store}>
      <Routes />
    </StateProvider>
  );
}