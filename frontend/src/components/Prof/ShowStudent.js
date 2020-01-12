import React, { Component } from 'react'
import axios from 'axios'
import StudentList from '../Student/StudentList'


 class ShowStudent extends Component {

constructor(props){

super(props);

this.state={

    students : [] ,
    find_filiere: '',

}

}

async componentDidMount(){

 const {data } = await  axios.get('http://localhost:4000/students/AllStudents')
     this.setState({
students: data ,
     }, () => {
        console.log(this.state.posts)
        return;
    })    

}

tabStudent(fil) {
   
    return this.state.students.map(function (object) {
 if(object.filiere==fil ){
      return <StudentList obj={object}  />;} 
    });
 }
 
 /* tabStudent() {
   
    return this.state.students.map(function (object) {
 
      return <StudentList obj={object}  />;} 
    );
 } */






    render() {
        return (
            <div>
            <h3 align="center">Student List</h3>
    
            <tr>
             
            
           <td>
        <div>{this.choix_departement()}</div> </td> 
           
            </tr>

            <table className="table">
            <thead className="thead-dark">
    <tr>
    
      <th scope="col">Nom</th>
      <th scope="col">Prenom</th>
      <th scope="col">CNE</th>
      <th scope="col">filiere</th>
      <th scope="col">Action</th>
    </tr>
            
            
    </thead>  
         
<tbody> {this.tabStudent(this.state.find_filiere)}</tbody>
                     
       
               
            </table>
            <div>
            <button  style={
                            {
                                'position': 'fixed',
                                'top': '90%',
                                'left': '50%',
                                'transform': 'translate(-50%, -50%)'
                            }}  onClick={() => window.print()}>Imprimer</button> </div>
          
          </div>
        )
        
    }

    choix_departement(){
        return(
          <div className="input-group mb-3" align="center">
    <div className="input-group-prepend">
      <label class="input-group-text" for="inputGroupSelect01">Département</label>
    </div>
            <select className="custom-select" id="inputGroupSelect01" 
            onChange={(e) => this.setState({ find_filiere: e.target.value  })}>
      <option value=" ">choisir filiere</option> 
      <option value="GI1">GI1</option>
      <option value="GI2">GI2</option>
      <option value="ISIL">ISIL</option>
      <option value="GODT1">GODT1</option>
      <option value="GODT2">GODT2</option>
      <option value="IDSF">IDSF 1</option>
      <option value="Environnement1">Environnement 1</option>
      <option value="ER1">ER1</option>
      <option value="ER2">ER2</option>
      <option value="ERDD">ERDD</option>
      <option value="TM1">TM1</option>
      <option value="TM2">TM2</option>
      <option value="MBF">MBF</option>
      <option value="Tourisme">Trourisme</option>
          </select>
         
          </div>
        ) ;
        
      }
}


export default ShowStudent ;