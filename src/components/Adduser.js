import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom'



function Adduser() {
  const [width, setWidth] = useState(null);
  const [swidth, setSwidth] = useState(null);
  useEffect(() => {
    if (window.innerWidth > 767) {
      setWidth('w-50 form-group');
      setSwidth('w-50 form-button');
    }
    else {
      setWidth('w-100 form-group');
      setSwidth('w-100 form-button');
    }
    const setsize = () => {
      console.log(width);
      if (window.innerWidth > 767) {
        setWidth('w-50 form-group');
        setSwidth('w-50 form-button');
      }
      else {
        setWidth('w-100 form-group');
        setSwidth('w-100 form-button');
      }
    }
    window.addEventListener('resize', setsize);
    return () => window.removeEventListener('resize', setsize);
  }, [window.innerWidth])
  const uniqueId = uuid();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fname: "", lname: "", designation: "", address: "", phone: "", email: "", password: "", uniqueId: uniqueId
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });//spread operator
  }
  const pushdata = async (e) => {
    e.preventDefault();
    // window.alert(props.location.data);
    const { fname, lname, designation, address, phone, email, password, uniqueId } = user;//destructuring
    const res = await fetch("/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        //fname:fname, lname:lname, designation:designation, address:address, phone:phone, email:email, password:password
        fname, lname, designation, address, phone, email, password, uniqueId//if both key value same, then write only one
      })
    });
    const data = await res.json();
    if (res.status === 201) {
      window.alert("Details Successfully Saved");
      navigate(`/`);

    }
    else if (res.status === 401) {
      window.alert("Please fill all the details");
    }
    else if (res.status === 402) {
      window.alert("Email already exist");
    }
    else if (res.status === 501) {
      window.alert("Failed to add user");
    }
  }

  return (
    <>
      <section className=' log-in'>
        <div className="container mt-5">
          <div className="login-content">
            <div className="row">
              <div className="Login-form">
                <h2 className="form-title">Add User</h2>
                <form method="POST" className='register-form' id='register-form'>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='fname'>
                      <i className='zmdi zmdi-name material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="fname" id="fname" autoComplete="off"
                      value={user.fname} onChange={handleInputs} placeholder="Enter the First Name" style={{ color: "black" }}></input>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='lname'>
                      <i className='zmdi zmdi-lname material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="lname" id="lname" autoComplete="off"
                      value={user.lname} onChange={handleInputs} placeholder="Enter the Last Name" style={{ color: "black" }}></input>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='designation'>
                      <i className='zmdi zmdi designation material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="designation" id="designation" autoComplete="off"
                      value={user.designation} onChange={handleInputs} placeholder="Enter the Designation" style={{ color: "black" }}></input>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='address'>
                      <i className='zmdi zmdi-address material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="address" id="address" autoComplete="off"
                      value={user.address} onChange={handleInputs} placeholder="Enter the Address" style={{ color: "black" }}></input>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='phone'>
                      <i className='zmdi zmdi-phone material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="phone" id="phone" autoComplete="off"
                      value={user.phone} onChange={handleInputs} placeholder="Enter Your Phone Number" style={{ color: "black" }}></input>
                  </div>
                  {/* <div>
                  <label htmlFor='image'>
                    Select User Image
                  </label>
                  <input className={width ? width : 'w-50 form-group'} type="file" name="image" id="image"></input>
              </div> */}
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='email'>
                      <i className='zmdi zmdi-email material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="email" name="email" id="email" autoComplete="off"
                      value={user.email} onChange={handleInputs} placeholder="Enter Your Email" style={{ color: "black" }}></input>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='password'>
                      <i className='zmdi zmdi-lock material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="password" name="password" id="password" autoComplete="off"
                      value={user.password} onChange={handleInputs} placeholder="Enter Your Password" style={{ color: "black" }}></input>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='CreateList'>
                      <i className='zmdi zmdi-name material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="CreateList" id="CreateList" autoComplete="off"
                      value={"Not Allow"} style={{ color: "black", background: "grey" }} disabled ></input>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='uniqueId'>
                      <i className='zmdi zmdi-uniqueId material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="uniqueId" id="uniqueId" autoComplete="off"
                      value={uniqueId} onChange={handleInputs} style={{ color: "black" }} hidden></input>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <input className={swidth ? swidth : 'w-50 form-button'} type="submit" name="login" id="login" value="Submit"
                      onClick={pushdata} />
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default Adduser