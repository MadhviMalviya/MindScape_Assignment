import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { MdPerson, MdEmail, MdLock } from 'react-icons/md';
import style from './style.module.css';
import swal from 'sweetalert';


function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    loginType: '',
  });

  function handleLogin(e) {
    e.preventDefault();

    const loggedUser = JSON.parse(localStorage.getItem('user'));

    if (!input.name || !input.password || !input.loginType) {
      alert('Please fill in all fields');
      return;
    }

    if (
      input.name === loggedUser?.name &&
      input.password === loggedUser?.password &&
      input.loginType === loggedUser?.loginType
    ) {
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('loginType', input.loginType);
      swal({
        title: "Good job!",
        text: "Logged in Successfully!",
        icon: "success",
      });
      // alert('Logged in successfully');
      navigate('/');
    } else {
      alert('Invalid password, username, or login type');
    }
  }

  return (
    <div className={style.main_container}>
    
      <form className={style.container} onSubmit={handleLogin}>
      <h1 className={style.heading}>Login</h1>
       

        <TextField
          label="Enter your username"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={input.name}
          onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          InputProps={{
            startAdornment: <MdPerson  color='brown' size={20} />,
          }}
        />

       

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

        <Button variant="contained" color="primary" className={style.submitBtn} type="submit">
  Submit
</Button>


        <p  className={style.account}>
          Don't have an account?
          <Link to={'/signup'}>
            <a className={style.signupLink}> Signup</a>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
