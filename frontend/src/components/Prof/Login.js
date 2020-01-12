import React, { Component } from 'react'
import { login } from './UserFunctions'

 class Login extends Component {
    constructor() {
        super()
        this.state = {
            fields: {},
            email : '',
            password : '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e){
            this.setState({[e.target.name] : e.target.value});
            let fields = this.state.fields;
    this.setState({
      fields
    });
    fields[e.target.name] = e.target.value;
    }
    onSubmit(e){
            e.preventDefault()
if(this.validateForm()){
            const user = {
                email : this.state.email,
                password : this.state.password,
            }
                login(user).then(res => {
                if(res) {
                    this.props.history.push('/profile')
                }else{
                    alert("les donnees incorrecte ou pas encore valider par l'admin")
                }
                
                })
            } else {
                console.log("ecrire vos donnes");
            }
            
            
    }
    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
       
    
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
    
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                            </div>
                            {/* <div className="alert alert-danger"
                                style={{ visibility: this.state.error !== '' ? 'visible' : 'hidden' }}>
                                {this.state.error}
                            </div> */}
                            <button type="submit" className="btn btn-lg btn-primary btn-block" 
                            style={{  }}>
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )

    }
}
export default Login;
