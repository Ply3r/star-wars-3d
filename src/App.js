import React from 'react';
import Planets from './components/Planets';
import Filter from './components/Filter';
import Info from './components/Infos';
import MyProvider from './context/MyProvider';
import './css/App.css'

function App() {
  return (
    <MyProvider>
      <Filter />
      <Planets />
      <Info />
    </MyProvider>
  );
}

export default App;
