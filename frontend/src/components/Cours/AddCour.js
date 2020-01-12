import React, { Component } from 'react';
import axios from 'axios';
import '../../css/bootstrap.min.css'
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class AddCour extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
            courFile: '',
            courName : '',
            courFiliere : '' ,
            loaded:0
        }
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    onFileChange(e) {
        this.setState({ courFile: e.target.files[0] })
    }

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('courFile', this.state.courFile)
        formData.append('courName' , this.state.courName)
        formData.append('courFiliere' , this.state.courFiliere)
        axios.post("http://localhost:4000/cours/addCour", formData, {  onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          })
      }}).then(res => {
           // this.props.history.push('/All')
            toast.success('upload success')
            console.log(res)
        }) .catch(err => { 
            toast.error('upload fail')
        })
    }
    handleChange = (e) =>{
        e.preventDefault()
        const {name , value} = e.target
        this.setState({ [name]: value  });
        // let fields= this.state.fields ;
        // this.setState({
        //     fields 
        // }) ;
        
        // fields[e.target.name]= e.target.value ;
    }

    render() {
        return (
            <div className="container">
                {/* <div className="row"> */}
                    <form onSubmit={this.onSubmit}>
                        
                        <h1 className="h3 mb-3 font-weight-normal">Add Cour :</h1>
                 
                 
                        <div className="form-group">
                            <label htmlFor="courName">Cour nom :</label>
                            <input
                            type="text"
                            className="form-control"
                            name="courName"
                            placeholder="Enter your courName"
                            value={this.state.courName}
                            onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                                <label> Cour Filiere : </label>
                                <input name="Filiere"
                                        type ="text"
                                        name="courFiliere"
                                       className = "form-control"
                                       value = {this.state.courFiliere}
                                       onChange = {this.handleChange} 
                                />
                        </div>
                        
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        
                        <div class="form-group">

<Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>

</div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                {/* </div> */}
                <div class="form-group">
   <ToastContainer />
</div>

            </div>
        )
    }
}