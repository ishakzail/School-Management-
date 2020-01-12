import React, { Component } from 'react';
import axios from 'axios';
import CoursList from './CoursList'


export default class ShowCour extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cours: [],
            find_filiere : ''
        }
    }

   
/*
    async componentDidMount(){
        
        const {data } = await  axios.get('http://localhost:4000/cours/All')
        this.setState({
            cours: data,
                }, () => {
                    console.log(this.state.posts)
            return;
        })
    }*/
    componentDidMount() {
        fetch('http://localhost:4000/cours/All')
          .then(response => response.json())
          .then(data => this.setState({ cours: data.cours }));
      }
      
      /*

    tabCours() {
     
            return this.state.cours.map(function (object) {
                  //  if(object.courFiliere == fil){ return <CoursList obj={object}  />;}
            <tr><td>{object.courName}</td></tr> 
                    });
        
       
     }*/
     viewHandler(liens){
       
     const file = new Blob([liens], {
            type: "application/pdf"
          });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          window.open(fileURL);
      

     }

    render() {
        const { cours } = this.state;
        return (
            <div>
                <h3 align="center">Cours List</h3>
                    
                    <tr>
                    <td>
                       
                    </td> 
                    </tr>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Nom Cour</th>
                            <th scope="col">Filiere</th>
                            <th scope="col">consulter</th>
                            <th>download</th>
                            
                            </tr> 
                        </thead>  
                        
                        <tbody> 
                     
        {cours.map(cour =>
        <tr>
        
            <td>{cour.courName}</td>
            <td>{cour.courFiliere}</td>
            <td><a href={cour.courFile}>{cour.courFile}</a></td>
            <button onClick={this.viewHandler(cour.courFile)}> download </button>
          </tr>
        )}
     
                        </tbody>
                     </table>
          </div>
        )
    }
    
}