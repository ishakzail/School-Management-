import axios  from 'axios'

export const register = newUser => {
    return axios
    .post('http://localhost:4000/users/register' , {
        fullName : newUser.fullName,
        email : newUser.email,
        password : newUser.password
    })
    .then(res => {
        console.log('registred !');
    })
}

export const login = user => {
    return axios
    .post('http://localhost:4000/users/login' , {
        email : user.email,
        password : user.password
    })
    .then(res => {
        localStorage.setItem('usertoken' , res.data);
        return res.data;
    })
    .catch(err =>{
      
        console.log(err)
    })
}


export const createStudent = newStudent => {
return axios 
.post('http://localhost:4000/students/addStudent',{
    firstName: newStudent.firstName ,
    lastName : newStudent.lastName , 
    cne : newStudent.cne,
    filiere : newStudent.filiere
})
.then(res=>{
    console.log('Student has been created correctly')
})
.catch(err=>{
console.log(err)
})

}