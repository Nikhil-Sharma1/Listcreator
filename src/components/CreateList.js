import React, { useState, useEffect } from 'react'
import loginpic from "./spot.jpeg"
import { v4 as uuid } from 'uuid';
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function CreateList() {
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
  const cuser = searchParams.get("createdby");
  const cuserId = searchParams.get("id");
  const uniqueId = uuid();
  const navigate = useNavigate();
  let name, value;
  const [list, setList] = useState({
    name: "", uniqueId: uniqueId, createdBy: cuser, createdById: cuserId
  });

  const handleInputs = (e) => {
    //console.log(e);
    name = e.target.name;
    value = e.target.value;
    setList({ ...list, [name]: value });//spread operator
  }
  const pushdata = async (e) => {
    e.preventDefault();
    // window.alert("hi");
    const { name, uniqueId, createdBy, createdById } = list;
    const res = await fetch('/addlist', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        uniqueId,
        createdBy,
        createdById
      })
    });
    const data = await res.json();
    if (res.status === 201) {
      window.alert("List Created Successfull");
      console.log(data);
      navigate(`/Home?listId=${data.uniqueId}`);
    }
    else {
      window.alert("Invalid Credentials");
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
                    <h2 className="form-title">Create List</h2>
                  </div>
                  <form method="POST" className='register-form' id='register-form'>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div>
                        <label htmlFor='name'>
                          <i className='zmdi zmdi-name material-icons-name'></i>
                        </label>
                        <input className={width ? width : 'w-50 form-group'} type="text" name="name" id="name" autoComplete="off"
                          value={list.name} onChange={handleInputs} placeholder="Enter Name of List" style={{ color: "black" }}></input>
                      </div>
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div >
                        <input className={swidth ? swidth : 'w-50 form-button form-submit'} type="submit" name="list" id="list" value="Create List"
                          onClick={pushdata} ></input>
                      </div>
                    </div>
                    <div>
                      <label htmlFor='uniqueId'>
                        <i className='zmdi zmdi-uniqueId material-icons-name'></i>
                      </label>
                      <input className="form-group" type="text" name="uniqueId" id="uniqueId" autoComplete="off"
                        value={uniqueId} onChange={handleInputs} style={{ color: "black" }} hidden></input>
                    </div>

                    <div>
                      <label htmlFor='createdBy'>
                        <i className='zmdi zmdi-uniqueId material-icons-name'></i>
                      </label>
                      <input className="form-group" type="text" name="createdBy" id="createdBy" autoComplete="off"
                        value={cuser} onChange={handleInputs} style={{ color: "black" }} hidden></input>
                    </div>
                    <div>
                      <label htmlFor='createdById'>
                        <i className='zmdi zmdi-createdById material-icons-name'></i>
                      </label>
                      <input className="w-100 form-group" type="text" name="createdById" id="createdById" autoComplete="off"
                        value={cuserId} onChange={handleInputs} style={{ color: "black" }} hidden></input>
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

export default CreateList