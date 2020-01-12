import React, { Component } from 'react'
import axios from 'axios'
 class Inscrire extends Component {
    
    constructor() {
        super();
        this.state = {
          fields: {},
          errors: {}
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
    
      };
      
      

      handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
    
      }

      submituserRegistrationForm(e) {
        e.preventDefault();
        axios.post('http://localhost:4000/users/register', this.state.fields)
          .then(res => res.data[0].msg)
          .catch(err => console.log(err))
    
        if (this.validateForm()) {
          /**/
          axios.post('http://localhost:4000/users/register', this.state.fields)
            .then(res => {
              if(res.data[0].succed)
              {
                alert("User created succesfuly");
                let fields = {};
                fields["fullName"] = "";
                fields["email"] = "";
                fields["password"] = "";
            
                this.setState({ fields: fields });
              }
              else{
                alert("Something went wrong");
              }
            })
            .catch(err => console.log(err))
    
        }
        }

        validateForm() {

            let fields = this.state.fields;
            let errors = {};
            let formIsValid = true;
        
            if (!fields["fullName"]) {
              formIsValid = false;
              errors["fullName"] = "*Please enter your name.";
            }
        
            if (typeof fields["fullName"] !== "undefined") {
              if (!fields["fullName"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["fullName"] = "*Please enter alphabet characters only.";
              }
            }
        
            if (!fields["email"]) {
              formIsValid = false;
              errors["email"] = "*Please enter your email-ID.";
            }
        
            if (typeof fields["email"] !== "undefined") {
              //regular expression for email validation
              var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
              if (!pattern.test(fields["email"])) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email-ID.";
              }
            }
        
            
        
            if (!fields["password"]) {
              formIsValid = false;
              errors["password"] = "*Please enter your password.";
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
      return (
            <div className="container">
             <div id="register">

<h3>               Registration page    </h3>
<form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
  <label>Name</label>
  <input type="text" name="fullName" value={this.state.fields.fullName} onChange={this.handleChange} />
  <div className="errorMsg">{this.state.errors.fullName}</div>
  <label>Email ID:</label>
  <input type="text" name="email" value={this.state.fields.email} onChange={this.handleChange} />
  <div className="errorMsg">{this.state.errors.email}</div>
  
  <label>Password</label>
  <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
  <div className="errorMsg">{this.state.errors.password}</div>
  <input type="submit" className="button" value="Register" />
</form>
</div>
          </div>
        )
    }
}



export default Inscrire ;