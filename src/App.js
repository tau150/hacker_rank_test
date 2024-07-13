import React from 'react';
import './App.css';
import 'h8k-components';
import Main from './Components/Main';
import { STUDENTS } from "./studentsList";

const title = "Hacker Dormitory";

function App() {

  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <Main STUDENTS={STUDENTS} />
    </div>
  );
}

export default App;

