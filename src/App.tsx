import React from 'react';
import DefaultLayout from './layout/default';
import "./assets/styles/app.css"
import Router from './router/index';
import "./assets/styles/app.css"

function App() {
  return (
    <DefaultLayout>
      <Router />
    </DefaultLayout>
  );
}

export default App;
