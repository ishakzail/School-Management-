import React, { Component } from 'react'
import {createStudent} from './UserFunctions' ;
import { Link, withRouter } from 'react-router-dom'


 class AddStudent extends Component {

constructor(props){

    super(props);
    this.state={
 
        fields:{} ,
       
        firstName : '',
        lastName :'',
        cne:'',
        filiere:'',
        errors:{
            firstName: '',
            lastName:'',
            cne:'',
            filiere:'',
      
      
              },
    }

this.handleChange = this.handleChange.bind(this);
this.handleSubmit= this.handleSubmit.bind(this);

}

handleChange(e){

e.preventDefault();
let fields= this.state.fields ;
this.setState({
    fields 
}) ;

fields[e.target.name]= e.target.value ;


    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case 'firstName': 
        errors.firstName= 
          value.length < 5 && value.length === 0
            ? 'le nom est incorrecte'
            : '';
        break;
      case 'lastName': 
        errors.lastName = 
        value.length < 5 && value.length === 0
        ? 'le prenom est incorrecte'
        : '';
        break;
      case 'cne': 
        errors.cne = 
          value.length < 5 && value.length === 0
            ? 'le cne se compose de 10 nombres'
            : '';
              break;
             
     /*  case 'filiere':
           errors.filiere = value == null ? 'entrer ton filiere ' : '' ;
           break ;       */
      default:
        break;
    }

    this.setState({errors, [name]: value});


}


handleSubmit = (event) => {
    event.preventDefault();
   if(this.validateForm() ) {
      console.info('Valid Form')
      const newStudent = {
            firstName :this.state.firstName,
            lastName:this.state.lastName,
            cne : this.state.cne,
            filiere: this.state.filiere ,
          }
          
         createStudent(newStudent).then(res => {
       this.props.history.push(`/addStudent`)
          })  
          alert('Etudiant bien ajouter')
        
   }else{
      alert('Somthing Wrong in your form')
      console.error('Invalid Form')
    } 
  }



validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["firstName"]) {
      formIsValid = false;
      errors["firstName"] = "*Please enter your name.";
    }

    if (typeof fields["firstName"] !== "undefined") {
      if (!fields["firstName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstName"] = "*Please enter alphabet characters only.";
      }
    }
    if (!fields["lastName"]) {
        formIsValid = false;
        errors["lastName"] = "*Please enter your name.";
      }
  
      if (typeof fields["lastName"] !== "undefined") {
        if (!fields["lastName"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["lastName"] = "*Please enter alphabet characters only.";
        }
      }

    

    if (!fields["cne"]) {
      formIsValid = false;
      errors["cne"] = "*Please enter your cne.";
    }

    if(!fields["filiere"]){
     
        formIsValid= false ;
        errors["filiere"]="*Please enter your filiere" ;
 
    }

  /*  if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
      }
    }*/

    this.setState({
      errors: errors
    });
    return formIsValid;


  }








    render() {
       // const {errors} = this.state;
        return (
            <div className="container">
            <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
                <form noValidate onSubmit={this.handleSubmit}>
                  <h1 className="h3 mb-3 font-weight-normal">Add Student</h1>
                 
                 
                  <div className="firstName">
                    <label htmlFor="firstName">firstName</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      placeholder="Enter your Firstname"
                      value={this.state.firstName}
                      onChange={this.handleChange} noValidate/>
                    {
                <span className='error' style={{ color : 'red' , fontSize : '13px' }}>{this.state.errors.firstName}</span>}
                  </div>
    
    
    
                  <div className="lastName">
                    <label htmlFor="lastName">lastName</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      placeholder="Enter your lastName"
                      value={this.state.lastName}
                      onChange={this.handleChange} noValidate/>
                   
                  </div>
    
    
    
                  <div className="cne">
                    <label htmlFor="cne">CNE</label>
                    <input
                      type="text"
                      for="inputWarning"
                      className="form-control"
                      name="cne"
                      placeholder="Entrer cne"
                      value={this.state.cne}
                      onChange={this.handleChange} noValidate/>
                     
                  </div>

            {     /* <div className="filiere">
                    <label htmlFor="filiere">filiere</label>
                    <input
                      type="text"
                      for="inputWarning"
                      className="form-control"
                      name="filiere"
                      placeholder="Entrer cne"
                      value={this.state.filiere}
                      onChange={this.handleChange} noValidate/>
                     
                  </div>

                    */}
    

         <div className="filiere">
           <label htmlfor="filiere">Example select</label>
    <select class="form-control" id="filiere" name="filiere" onChange={this.handleChange} noValidate>
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
      




           

    
    
    
                  <br/>
                  
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Ajouter
              
                  </button>
                </form>
              </div>
            </div>
          </div>
        )
    }
}


export default AddStudent ;