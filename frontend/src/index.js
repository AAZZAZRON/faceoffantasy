import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {persistReducer} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import loadedReducer from './app/features/loaded';
import nhlReducer from './app/features/nhl';
import leaguesReducer from './app/features/leagues';
import teamsReducer from './app/features/teams';

// as per https://www.youtube.com/watch?v=b88Z5POQBwI
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const reducer = combineReducers({
  loaded: loadedReducer,

  nhl: nhlReducer,
  leagues: leaguesReducer,
  teams: teamsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer:persistedReducer,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
