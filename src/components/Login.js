import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import loginpic from "./spot.jpeg"
function Login() {
  const [width, setWidth] = useState(null);
  const [swidth, setSwidth] = useState(null);
  useEffect(() => {

    if (window.innerWidth > 1199) {
      setWidth('w-25 form-group');
      setSwidth('w-25 form-button form-submit');
    }
    else if (window.innerWidth > 767) {
      setWidth('w-50 form-group');
      setSwidth('w-50 form-button form-submit');
    }
    else {
      setWidth('w-100 form-group');
      setSwidth('w-100 form-button form-submit');
    }
    const setsize = () => {
      console.log(width);
      if (window.innerWidth > 1199) {
        setWidth('w-25 form-group');
        setSwidth('w-25 form-button form-submit');
      }
      else if (window.innerWidth > 767) {
        setWidth('w-50 form-group');
        setSwidth('w-50 form-button form-submit');
      }
      else {
        setWidth('w-100 form-group');
        setSwidth('w-100 form-button form-submit');
      }
    }
    window.addEventListener('resize', setsize);
    return () => window.removeEventListener('resize', setsize);
  }, [window.innerWidth])

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const listId = searchParams.get("listId");
  const deleted = searchParams.get("delete");
  const uniqueId = searchParams.get("uniqueid");
  console.log(listId);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    if (!uniqueId) {
      const res = await fetch('/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          listId,
          deleted
        })
      });
      const data = await res.json();
      if (res.status === 201) {
        window.alert("Login Successfull");
        const uname = data.fname + " " + data.lname;
        navigate(`/CreateList?createdby=${uname}&id=${data.uniqueId}`);
      }
      else if (res.status === 202) {
        window.alert("Login Successfull");
        navigate(`/Home?listId=${listId}`);
      }
      else if (res.status === 203) {
        window.alert("Login Successfull");
        window.alert("List Deleted Successfully");
        navigate(`/`);
      }
      else if (res.status === 400) {
        window.alert("Email or password is incorrect");
      }
      else if (res.status === 401) {
        window.alert("You are not authorized to create a list");
      }
      else if (res.status === 402) {
        window.alert("Only admin of list can edit the list")
      }
      else if (res.status === 403) {
        window.alert("Only admin of list can delete the list")
      }
    }
    else {
      const res = await fetch('/logintoupdate', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          uniqueId
        })
      });
      const data = await res.json();
      if (res.status === 201 || res.status === 203) {
        navigate(`/UpdateUser?uniqueid=${uniqueId}&admin=yes`);
      }
      else if (res.status === 202) {
        navigate(`/UpdateUser?uniqueid=${uniqueId}`);
      }
      else if (res.status === 200) {
        window.alert("Only admin and the user himself can change the user's value ");
      }
      else {
        window.alert("Email or password is incorrect");
      }
    }
  }
  return (
    <>
      <section className='h-100 log-in'>
        <div className="container mt-5">
          <div className="login-content">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="login-pic">
                  <figure>
                    <img src={loginpic} alt="loginpic" />
                  </figure>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="Login-form">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <h2 className="form-title">Log In</h2></div>
                  <form method="POST" className='register-form' id='register-form'>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <label htmlFor='email'>
                        <i className='zmdi zmdi-email material-icons-name'></i>
                      </label>
                      <input className={width ? width : 'w-50 form-group'} type="email" name="email" id="email" autoComplete="off"
                        value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" style={{ color: "black" }}></input>
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <label htmlFor='password'>
                        <i className='zmdi zmdi-lock material-icons-name'></i>
                      </label>
                      <input className={width ? width : 'w-50 form-group'} type="password" name="password" id="password" autoComplete="off"
                        value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" style={{ color: "black" }}></input>
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <input className={swidth ? swidth : 'w-50 form-button form-submit'} type="submit" name="login" id="login" value="Log In"
                        onClick={loginUser} />
                    </div>

                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login