import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'




function Adduser() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uniqueId = searchParams.get("uniqueid");
  const admin = searchParams.get("admin");
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState([]);
  let [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [designation, setDesignation] = useState('');
  const [cuser, setCuser] = useState([{ name: 'no user' }]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({
    fname: "", lname: "", designation: "", address: "", phone: "", email: "", password: ""
  });
  console.log(uniqueId);


  const [width, setWidth] = useState(null);
  const [swidth, setSwidth] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch('/userinfo',
          {
            method: "POST",
            headers:
            {
              "Content-Type": "application/json"
            },
            body: JSON.stringify
              ({
                uniqueId
              })
          });
        const data = await res.json();
        console.log(data);
        if (res.status === 201) {
          setFname(data[0].fname);
          setLname(data[0].lname);
          setDesignation(data[0].designation);
          setAddress(data[0].address);
          setPhone(data[0].phone);
          setEmail(data[0].email);
          setPassword(data[0].password);
        }
        else {
          window.alert("no data found");
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchdata();


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
  const pushdata = async (e) => {
    e.preventDefault();
    // window.alert(props.location.data);
    const res = await fetch("/updateuser", {
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
      window.alert("Details Updated Successfully ");
      if (admin) {
        // navigate(`/UserDetails?luserid=${uniqueId}&admin="yes"`);
        navigate(-2);
      }
      else {
        navigate(`/UserDetails?luserid=${uniqueId} `);
      }
    }
    else if (res.status === 401) {
      window.alert("Please fill all the details");
    }
    else if (res.status === 501) {
      window.alert("Failed to add user");
    }
  }
  console.log(fname);

  return (
    <>
      <section className='log-in'>
        <div className="container mt-5">
          <div className="login-content">
            <div className="row">


              <div className="Login-form">
                <h2 className="form-title">Update User</h2>
                <form method="POST" className='register-form' id='register-form'>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='fname'>
                      <i className='zmdi zmdi-name material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="fname" id="fname" autoComplete="off"
                      value={
                        fname.length !== 0 ? cuser.map((e) => {
                          return fname;
                        }) : cuser.map(() => { return '' })
                      } onChange={(e) => { setFname(e.target.value) }} placeholder="Enter the First Name" style={{ color: "black" }}></input>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='lname'>
                      <i className='zmdi zmdi-lname material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="lname" id="lname" autoComplete="off"
                      value={
                        lname.length !== 0 ? cuser.map((e) => {
                          return lname;
                        }) : cuser.map(() => { return '' })
                      } onChange={(e) => setLname(e.target.value)} placeholder="Enter the Last Name" style={{ color: "black" }}></input>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='designation'>
                      <i className='zmdi zmdi designation material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="designation" id="designation" autoComplete="off"
                      value={
                        designation.length !== 0 ? cuser.map((e) => {
                          return designation;
                        }) : cuser.map(() => { return '' })
                      } onChange={(e) => setDesignation(e.target.value)} placeholder="Enter the Designation" style={{ color: "black" }}></input>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='address'>
                      <i className='zmdi zmdi-address material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="address" id="address" autoComplete="off"
                      value={
                        address.length !== 0 ? cuser.map((e) => {
                          return address;
                        }) : cuser.map(() => { return '' })
                      } onChange={(e) => setAddress(e.target.value)} placeholder="Enter the Address" style={{ color: "black" }}></input>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='phone'>
                      <i className='zmdi zmdi-phone material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="phone" id="phone" autoComplete="off"
                      value={
                        phone.length !== 0 ? cuser.map((e) => {
                          return phone;
                        }) : cuser.map(() => { return '' })
                      } onChange={(e) => setPhone(e.target.value)} placeholder="Enter Your Phone Number" style={{ color: "black" }}></input>
                  </div>
                  {/* <div>
                  <label htmlFor='image'>
                    Select User Image
                  </label>
                  <input className="form-group" type="file" name="image" id="image"></input>
              </div> */}
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='email'>
                      <i className='zmdi zmdi-email material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="email" name="email" id="email" autoComplete="off"
                      value={
                        email.length !== 0 ? cuser.map((e) => {
                          return email;
                        }) : cuser.map(() => { return '' })
                      } onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" style={{ color: "black" }}></input>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='password'>
                      <i className='zmdi zmdi-lock material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="password" name="password" id="password" autoComplete="off"
                      value={
                        password.length !== 0 ? cuser.map((e) => {
                          return password;
                        }) : cuser.map(() => { return '' })
                      } onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" style={{ color: "black" }}></input>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='CreateList'>
                      <i className='zmdi zmdi-name material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="CreateList" id="CreateList" autoComplete="off"
                      value={"Not Allow"} style={{ color: "black", background: "grey" }} disabled ></input>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <input className={swidth ? swidth : 'w-50 form-button form-submit'} type="submit" name="login" id="login" value="Update"
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