import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './css/bootstrap.min.css'
import Navbar from './components/Prof/Navbar'
import Landing from './components/Prof/Landing'
import Login from './components/Prof/Login'
import Register from './components/Prof/Register'
import Profile from './components/Prof/Profile'
import Inscrire from './components/Prof/Inscrire'
import AddStudent from './components/Prof/AddStudent'
import ShowStudent from './components/Prof/ShowStudent'
import AddCour from './components/Cours/AddCour'
import ValidUser from './components/Prof/ValidUser'
import ShowCours from './components/Cours/ShowCour'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />


          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/addStudent" component={AddStudent}/>
            <Route exact path="/showStudent" component = {ShowStudent} />
            <Route exact path="/addCour" component={AddCour}/>
            <Route exact path="/validUser" component={ValidUser}/>
            <Route exact path="/showCours" component={ShowCours}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default App