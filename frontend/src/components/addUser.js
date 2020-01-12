import React, { Component } from 'react'
import axios from 'axios'

 class addUser extends Component {

    state = {
        fullName: '',
        password:'',
        email:''
      }
    
      handleChange = event => {
        this.setState({ fullname: event.target.value ,
        password: event.target.value ,
    email: event.target.value });
      }
    
      handleSubmit = event => {
        event.preventDefault();
    
        const user = {
          fullName: this.state.fullName ,
          password: this.state.password ,
          email: this.state.email

        };
    
        axios.post('http://localhost:4000/users', { user })
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }


    render() {
        return (
            
                 <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="fullName" value={this.state.fullName}onChange={this.handleChange} />
          </label>
          <label>
            Person email:
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            Person password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
           
        )
    }
}

export default addUser ;