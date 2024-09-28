import React from 'react';
import './App.css';
import ReactPlayground from './components/ReactPlayground';
import PlaygroundProvider from './components/PlaygroundContext';

const App: React.FC = () => (
  <PlaygroundProvider>
    <ReactPlayground></ReactPlayground>
  </PlaygroundProvider>
);
export default App;
