import React, {useState, useEffect} from 'react';
import Header from '../header'
import Nav from '../nav';
import FirstPage from '../firstPage';
import SecondPage from '../secondPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  const [selected, setItems] = useState([]);
  

 
  return (
    <>
    <Router>
      <Header/>
      <Nav/>
      <Route path="/firstpage" component={() => <FirstPage selected={selected}/>}/>
      <Route path="/secondpage" component={() => <SecondPage setState={setItems} state={selected} />}/>
    </Router>
    </>
  )

}

export default App;
