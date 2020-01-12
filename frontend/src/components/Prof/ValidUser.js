import React, { Component } from 'react'
import UserList from './UserList'
import axios from 'axios'

 class ValidUser extends Component {

    constructor(props){

        super(props);
        
        this.state={
        
           users : [] ,
            
        
        }
        
        }
        
        async componentDidMount(){
        
         const {data } = await  axios.get('http://localhost:4000/users/Allusers')
             this.setState({
        users: data ,
             }, () => {
                console.log(this.state.posts)
                return;
            })    
        
        }
        tabUsers() {
   
            return this.state.users.map(function (object) {
        
              return <UserList obj={object}  />
            });
         }
         




    render() {
        
        return (
            <div>
            <h3 align="center">List of Register</h3>
    
           

            <table className="table">
            <thead className="thead-dark">
    <tr>
    
      <th scope="col">Nom</th>
 
      <th scope="col">Email</th>
      <th scope="col">Activer utilisateur</th>
    </tr>
            
            
    </thead>  
         
        <tbody> {this.tabUsers()}</tbody>
                     
       
               
            </table>
            
          
          </div>
        )
    }
}


export default ValidUser 