import React, { Component } from 'react'
//import axios from 'axios'
class CoursList extends Component {
    
    constructor(props){
        super(props);
        //this.delete= this.delete.bind(this);
    }
    
    // delete() {
    //     axios.delete('http://localhost:4000/cours/'+ this.props.obj._id)
    //       .then(console.log('Deleted'))
    //       .catch(err => console.log(err));
    //        window.location.reload();
    //   }
    
    
    render() {
        return (

           <tr>
                <td>{this.props.obj.courName}</td>

                <td>{this.props.obj.courFiliere} </td>

                <td>  {this.props.obj.courFile}</td>


                {/* <td>  <button onClick={this.delete} className="btn btn-danger">Delete</button> </td> */}
        
            </tr>
        )
    }
}




export default CoursList ;