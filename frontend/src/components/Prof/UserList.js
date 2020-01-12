import React, { Component } from 'react'
import '../../css/bootstrap.min.css'
import axios from 'axios'

 class UserList extends Component {
  
    constructor(props){
        super(props);
        this.validate= this.validate.bind(this);
            }
            
            validate() {
                
                axios.put('http://localhost:4000/users/valid/'+ this.props.obj._id, {
                    valid :1 , 
                })
                  .then(console.log('valider'))
                  .catch(err => console.log(err));
                   window.location.reload();
              }
            
            
             


            render() {
                return (
        
                   <tr>
               
                    
        
        
        
        
        
        
        
         <td>{this.props.obj.fullName}</td>
        
        <td>{this.props.obj.email} </td>
        
   
        
    
        
         <td>  <button onClick={this.validate} className="btn btn-success">Valider</button> </td>
                
        
        
        
        
        
        
        </tr>
                )
            }
        }
export default UserList  