import React, { Component } from 'react'
import { register } from './UserFunctions'

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
/* const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}
*/
class Register extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     fullName: '',
  //     email: '',
  //     password: '',
  //     errors: {}
  //   }
  
  constructor(props) {
    super(props);
    this.state = {
      fields: {},

      fullName: '',
      email:'',
      password: '',
      errors: {
        fullName: '',
        email: '',
        password: '',
      }
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //   this.onChange = this.onChange.bind(this)
  //   this.onSubmit = this.onSubmit.bind(this)
  // }

  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.value })
  // }
  // onSubmit(e) {
  //   e.preventDefault()

  //   const newUser = {
  //     fullName: this.state.fullName,
  //     email: this.state.email,
  //     password: this.state.password
  //   }

  //   register(newUser).then(res => {
  //     this.props.history.push(`/login`)
  //   })
  // }

  handleChange = (event) => {
    event.preventDefault();
    let fields = this.state.fields;
    this.setState({
      fields
    });
    fields[event.target.name] = event.target.value;
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'fullName': 
        errors.fullName = 
          value.length < 5 && value.length === 0
            ? 'Full Name must be 5 characters long!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.validateForm() ) {
      console.info('Valid Form')
      const newUser = {
            fullName: this.state.fullName,
            email: this.state.email,
            password: this.state.password
          }
          
          register(newUser).then(res => {
            this.props.history.push(`/login`)
          })  
    }else{
      alert('Somthing Wrong in your form')
      console.error('Invalid Form')
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
    const {errors} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.handleSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
             
             
              <div className="fullName">
                <label htmlFor="name">full name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  placeholder="Enter your Full name"
                  value={this.state.fullName}
                  onChange={this.handleChange} noValidate/>
                {
                <span className='error' style={{ color : 'red' , fontSize : '13px' }}>{errors.fullName}</span>}
              </div>



              <div className="email">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleChange} noValidate/>
                {
                <span className='error' style={{ color : 'red' , fontSize : '13px' }}>{errors.email}</span>}
              </div>



              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  for="inputWarning"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange} noValidate/>
                  {
                <span className='error' style={{ color : 'red' , fontSize : '13px' }}>{errors.password}</span>}
              </div>




              <br/>
              
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register