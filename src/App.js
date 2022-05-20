import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home'
import Navbar from './components/Navbar';
import Login from './components/Login';
import Front from './components/Front';
import Adduser from './components/Adduser';
import CreateList from './components/CreateList';
import SeeListUser from './components/SeeListUser';
import UserDetails from './components/Userdetails';
import UpdateUser from './components/Updateuser';

function App() {
  return (
    <>

      <Router>
        <div className="App" style={{ overflow: 'scroll' }}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Front />}></Route>
            <Route exact path="/CreateList" element={<CreateList />}></Route>
            <Route exact path="/Adduser" element={<Adduser />}></Route>
            <Route exact path="/Home" element={<Home />}></Route>
            <Route exact path="/SeeListUser" element={<SeeListUser />}></Route>
            <Route exact path="/Login" element={<Login />}></Route>
            <Route exact path="/UserDetails" element={<UserDetails />}></Route>
            <Route exact path="/UpdateUser" element={<UpdateUser />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
