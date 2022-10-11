import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';
import View from './components/View';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/edit' element={<Edit/>} />
          <Route path='/view' element={<View/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
