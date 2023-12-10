import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import style from './style.module.css'
import { TextField, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { MdPerson, MdEmail, MdLock } from 'react-icons/md';
import swal from 'sweetalert';



function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
    const [isRegistered, setRegistered] = useState(false)
  const [input, setInput] = useState({
    name: '',
    email: '',             
    password: '',
    loginType: '',
  });



  // 
  function validationForm({ name, email, password ,loginType}) {
    let errors = {}
    if (!name) {
        errors.name = 'Name is required'
    } else if ((/[^a-zA-Z\s]/.test(name))) {
        errors.name = 'Name should not contain special characters'
    } if (!email) {
        errors.email = 'email is required'
    } else if (!/@/.test(email) || email.length < 12) {
        errors.email = 'Enter valid mail'
    } 
    if (!password) {
      errors.password = 'Password is required!';
    } else if (password.length < 6) {
      errors.password = 'Password should be at least 6 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
      errors.password =
        'Password requires: lowercase, uppercase, digit, and special character.';
    }
    if(!loginType){
      errors.loginType='Select one type!'
    
    }
    return errors
}
 


///////////////////////////


  function handleSubmit(e) {
    e.preventDefault()
    const errors = validationForm(input)
    if (Object.keys(errors).length === 0) {
        const storedUser = localStorage.getItem('user')
        const existingUser = storedUser ? JSON.parse(storedUser) : null

        if (existingUser && existingUser.email === input.email) {
            alert('email is already registered!')
        } else {
            localStorage.setItem('user', JSON.stringify(input))
            swal({
              title: "Good job!",
              text: "Registered Successfully!",
              icon: "success",
            });

          
            navigate('/login')
            setRegistered(true)
        }

    } else {
        setErrors(errors)
    }
}


  return (
    <div className={style.main_container}>
    <div className={style.container}>
    <h1 className={style.heading}>Signup</h1>

    <form className={style.form} onSubmit={handleSubmit}>
     
      <TextField
        label="Enter your username"
        variant="outlined"
        fullWidth
        margin="normal"
        name="name"
        value={input.name}
        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
        InputProps={{
          startAdornment: <MdPerson color='brown' size={20} />,
        }}
      />
      {errors.name && <p className={style.p} >{errors.name}</p>}

      <TextField
        label="Enter your email"
        variant="outlined"
        fullWidth
        margin="normal"
        name="email"
        value={input.email}
        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
        InputProps={{
          startAdornment: <MdEmail color='brown' size={20} />,
        }}
      />
      {errors.email && <p className={style.p}>{errors.email}</p>}

      <TextField
        type="password"
        label="Enter your password"
        variant="outlined"
        fullWidth
        margin="normal"
        name="password"
        value={input.password}
        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
        InputProps={{
          startAdornment: <MdLock color='brown' size={20} />,
        }}
      />
      {errors.password && <p className={style.p} >{errors.password}</p>}

      <RadioGroup
        row
        className={style.radioGroup}
        value={input.loginType}
        onChange={(e) => setInput({ ...input, loginType: e.target.value })}
      >
        <FormControlLabel value="user" control={<Radio />} label="User" />
        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
        <FormControlLabel value="client" control={<Radio />} label="Client" />
      </RadioGroup>
      <p  className={style.p}>{errors.loginType}</p>


<br></br>

      <Button variant="contained" color="primary" className={style.submitButton} type="submit">
        Submit
      </Button>
      <p className={style.account}>
        Already have an account?
        <Link to={'/login'}>
          <a> Login</a>
        </Link>
      </p>
    </form>
  </div>
  </div>
);
}

export default Signup;