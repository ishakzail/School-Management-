import React, { Component } from 'react'
import '../../css/bootstrap.min.css'
import axios from 'axios'
class StudentList extends Component {
    
    constructor(props){
super(props);
this.delete= this.delete.bind(this);
    }
    
    delete() {
        axios.delete('http://localhost:4000/students/'+ this.props.obj._id)
          .then(console.log('Deleted'))
          .catch(err => console.log(err));
           window.location.reload();
      }
    
    
    render() {
        return (

           <tr>
       
            







 <td>{this.props.obj.firstName}</td>

<td>{this.props.obj.lastName} </td>

<td>  {this.props.obj.cne}</td>

<td> {this.props.obj.filiere} </td> 

 <td>  <button onClick={this.delete} className="btn btn-danger">Delete</button> </td>
        






</tr>
        )
    }
}




export default StudentList ;