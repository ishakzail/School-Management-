import React, { Component } from 'react'
import axios from 'axios'

 class login extends Component {
    state ={

        users :[] ,
        Listuser : [],
        } 
        
        componentDidMount(){
           axios.get('http://localhost:4000/users').then(res=>{const users=res.data;
        this.setState({users})})
        }







    render() {
        return (
            <div>
                
 list users :
       
 <ul>
        {this.state.users.map(user=> <div><li> { user.fullName}</li>
                                      <li>{user.email}</li>
                                      <li>{user.password}</li>
                                      </div>
        
        
        )}
 </ul>


            </div>
        )
    }
}


export default login ;