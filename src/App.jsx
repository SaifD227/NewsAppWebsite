
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 5;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar color='#f11946' progress={progress} />
        <div className="container mt-3">
          <Routes>
            <Route exact path='/' element={<News setProgress={setProgress} pageSize={pageSize} country='us' category="general" />} />
            <Route exact path='/home' element={<News setProgress={setProgress} key="home" pageSize={pageSize} country='us' category="general" />} />
            <Route exact path='/about' element={<News setProgress={setProgress} key="about" pageSize={pageSize} country='us' category="general" />} />
            <Route exact path='/business' element={<News setProgress={setProgress} key="business" pageSize={pageSize} country='us' category="business" />} />
            <Route exact path='/entertainment' element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} country='us' category="entertainment" />} />
            <Route exact path='/general' element={<News setProgress={setProgress} key="general" pageSize={pageSize} country='us' category="general" />} />
            <Route exact path='/health' element={<News setProgress={setProgress} key="health" pageSize={pageSize} country='us' category="health" />} />
            <Route exact path='/science' element={<News setProgress={setProgress} key="science" pageSize={pageSize} country='us' category="science" />} />
            <Route exact path='/sports' element={<News setProgress={setProgress} key="sports" pageSize={pageSize} country='us' category="sports" />} />
            <Route exact path='/technology' element={<News setProgress={setProgress} key="technology" pageSize={pageSize} country='us' category="technology" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
