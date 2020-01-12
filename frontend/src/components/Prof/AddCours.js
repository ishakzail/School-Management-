import React, { Component } from 'react'
import axios from 'axios';
import '../../css/bootstrap.min.css'
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



 class AddCours extends Component {
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null ,
            loaded:0

          }
       
      }


      onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:4000/students/upload", data, {  onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          })
      },
           // receive two    parameter endpoint url ,form data
       })
       .then(res => { 
        toast.success('upload success')
    })
    .catch(err => { 
        toast.error('upload fail')
    })
     }



     
    render() {
        return (
            <div className="countainer">
                <div className="row">
<div className="offset-md-3 col-md-6 ">
<div className="form-group files">

<label>                 Upload your file</label>

<br></br>
<br></br>
<br></br>

<input type="file" name="file" onChange={this.onChangeHandler}/>

<div class="form-group">

<Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>

</div>

</div>

<button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 


</div>

<div class="form-group">
   <ToastContainer />
</div>

                </div>
                
            </div>
        )
    }
}



export default AddCours ;