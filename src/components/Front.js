import React, { useEffect, useState } from 'react'

import {
  Link
} from "react-router-dom";

import { MdDelete } from 'react-icons/md'
import { FaUserEdit } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa'
import Media from 'react-media'

function Front() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [cuser, setCuser] = useState([{ name: "no user found" }]);
  const GoLogin = (e) => {
    window.alert("For creating a list, you have to login. Redirecting to login page");
  }
  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch('/getlists', {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        const data = await res.json();
        if (res.status === 201) {
          setList(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchList();
  }, [])
  const addList = async (e) => {
    setText(e.target.value);

    try {
      const res = await fetch('/getlist',
        {
          method: "POST",
          headers:
          {
            "Content-Type": "application/json"
          },
          body: JSON.stringify
            ({
              pattern: e.target.value
            })
        });
      const data = await res.json();
      if (res.status === 201) {
        setList(data);
      }
      else if (res.status === 202) {
        setList([]);
      }
      else if (res.status === 203) {
        try {
          const res = await fetch('/getlists', {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            credentials: "include"
          });
          const data = await res.json();
          if (res.status === 201) {
            setList(data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className='container bg-success'>
        <div className="row">
          <div className="col-md-12">
            <h1 align='center' style={{ marginTop: '10px' }}>Customer Success Managers</h1>
          </div>
          <Media query="(min-width:273px)" key='20'>
            {matches => {
              return matches ? <>
                <div className="col col-sm-6 col-md-6">
                  <Link aria-current="page" to={{ pathname: "/Adduser" }}>
                    <button type="button" className="btn btn-dark Uadd" style={{ marginLeft: 'auto' }} >Add Yourself to company's database</button></Link>
                </div>
                <div className="col col-sm-6 col-md-6 ">
                  <Link aria-current="page" to="/Login">
                    <button type="button" className="btn btn-dark Ladd" style={{ marginRight: 'auto' }} onClick={GoLogin}>Create List</button></Link>
                </div>
              </> :
                <>
                  <div className="col col-sm-6 col-md-6">
                    <Link aria-current="page" to={{ pathname: "/Adduser" }}>
                      <button type="button" className="btn btn-dark Uadd" style={{ marginLeft: 'auto', fontSize: '6px' }} >Add Yourself to company's database</button></Link>
                  </div>
                  <div className="col col-sm-6 col-md-6 ">
                    <Link aria-current="page" to="/Login">
                      <button type="button" className="btn btn-dark Ladd" style={{ marginRight: 'auto', fontSize: '6px' }} onClick={GoLogin}>Create List</button></Link>
                  </div>
                </>
            }}
          </Media>

          <div className="col-md-12">
            <form className="d-flex">
              <input className="form-control me-2 lsearch" type="text" onChange={addList} value={text} placeholder="Search Lists" aria-label="Search" style={{ position: 'relative', marginTop: '20px' }}></input>
            </form>
          </div>
          < div className="col-md-12">
            <div className="card" style={{ marginTop: "25px", marginBottom: "25px" }}>
              <div className="card-header">
                <h2>Lists</h2>
              </div>
              <ul className="list-group list-group-flush">
                {
                  list.length !== 0 ? list.map((element) => {
                    return <li className="list-group-item" key={element.uniqueId} style={{ height: 'fit-content' }}>
                      <Media query="(min-width:768px)" key='20'>
                        {matches => {
                          return matches ?
                            <>
                              <div className="col-2 col-sm-1-3qtr col-md-1 col-lg-1 col-xl-0-3qtr">
                                <div className='usericon'>{element.name[0]}</div></div>

                              <div className="col-6 col-sm-6 col-md-8 col-lg-5 col-xl-9">
                                <div className="d-flex flex-column bd-highlight mb-9">
                                  <h1> {element.name}</h1>
                                  <h3> Created by {element.createdBy}</h3>
                                </div>
                              </div>
                              <div className="col-4 col-sm-3 col-md-3 col-lg-2 col-xl-2" style={{ marginLeft: "auto", display: 'flex' }}>
                                <div className="col-4" align='right'>
                                  <Link aria-current="page" to={{ pathname: `/SeeListUser?listId=${element.uniqueId}` }}>
                                    <FaRegEye className="UList" />
                                  </Link>
                                </div>
                                <div className="col-4" align='right'>
                                  <Link aria-current="page" to={{ pathname: `/Login?listId=${element.uniqueId}` }}>
                                    <FaUserEdit className="UListData" /></Link>
                                </div>
                                <div className="col-4" align='right'>
                                  <Link style={{ marginLeft: 'auto' }} aria-current="page" to={{ pathname: `/Login?listId=${element.uniqueId}&delete=yes` }}>
                                    <MdDelete style={{ color: 'red', fontSize: '3em' }} /></Link>
                                </div></div></> : <Media query="(min-width:400px)" key='20'>
                              {matches => {
                                return matches ?
                                  <>
                                    <div className="col-2 col-sm-1-3qtr col-md-1 col-lg-1 col-xl-0-3qtr">
                                      <div className='usericon'>{element.name[0]}</div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-8 col-lg-5 col-xl-9">
                                      <div className="d-flex flex-column bd-highlight mb-9">
                                        <h1> {element.name}</h1>
                                        <h3> Created by {element.createdBy}</h3>
                                      </div>
                                    </div>
                                    <div className="col-4 col-sm-3 col-md-3 col-lg-2 col-xl-2" style={{ marginLeft: "auto", display: 'flex' }}>
                                      <div className="col-4" align='right' style={{ marginRight: '13px' }}>
                                        <Link aria-current="page" to={{ pathname: `/SeeListUser?listId=${element.uniqueId}` }}>
                                          <FaRegEye className="UList" />
                                        </Link>
                                      </div>
                                      <div className="col-4" align='right' style={{ marginRight: '5px' }}>
                                        <Link aria-current="page" to={{ pathname: `/Login?listId=${element.uniqueId}` }}>
                                          <FaUserEdit className="UListData" /></Link>
                                      </div>
                                      <div className="col-4" align='right'>
                                        <Link style={{ marginLeft: 'auto' }} aria-current="page" to={{ pathname: `/Login?listId=${element.uniqueId}&delete=yes` }}>
                                          <MdDelete style={{ color: 'red', fontSize: '3em' }} /></Link>
                                      </div></div></> :
                                  <Media query="(min-width:330px)" key='20'>
                                    {matches => {
                                      return matches ?
                                        <>
                                          <div className="col-2 col-sm-1-3qtr col-md-1 col-lg-1 col-xl-0-3qtr">
                                            <div className='usericon'>{element.name[0]}</div>
                                          </div>
                                          <div className="col-6 col-sm-6 col-md-8 col-lg-5 col-xl-9">
                                            <div className="d-flex flex-column bd-highlight mb-9">
                                              <h1> {element.name}</h1>
                                              <h3> Created by {element.createdBy}</h3>
                                            </div>
                                          </div>
                                          <div className="col-4 col-sm-3 col-md-3 col-lg-2 col-xl-2" style={{ marginLeft: "auto", display: 'flex' }}>
                                            <div className="col-4" align='right' style={{ marginRight: '13px' }}>
                                              <Link aria-current="page" to={{ pathname: `/SeeListUser?listId=${element.uniqueId}` }}>
                                                <FaRegEye className="UList" />
                                              </Link>
                                            </div>
                                            <div className="col-4" align='right' style={{ marginRight: '5px' }}>
                                              <Link aria-current="page" to={{ pathname: `/Login?listId=${element.uniqueId}` }}>
                                                <FaUserEdit className="UListData" /></Link>
                                            </div>
                                            <div className="col-4" align='right'>
                                              <Link style={{ marginLeft: 'auto' }} aria-current="page" to={{ pathname: `/Login?listId=${element.uniqueId}&delete=yes` }}>
                                                <MdDelete style={{ color: 'red', fontSize: '3em' }} /></Link>
                                            </div></div></> : <>
                                          <div className="col-3 col-sm-1-3qtr col-md-1 col-lg-1 col-xl-0-3qtr">
                                            <div className='usericon'>{element.name[0]}</div>
                                          </div>
                                          <div className="col-5 col-sm-6 col-md-8 col-lg-5 col-xl-9">
                                            <div className="d-flex flex-column bd-highlight mb-9">
                                              <h5> {element.name}</h5>
                                              <h6> Created by {element.createdBy}</h6>
                                            </div>
                                          </div>
                                          <div className="col-4 col-sm-3 col-md-3 col-lg-2 col-xl-2" style={{ marginLeft: "auto", display: 'flex' }}>
                                            <div className="col-4" align='right' style={{ marginRight: '15px' }}>
                                              <Link aria-current="page" to={{ pathname: `/SeeListUser?listId=${element.uniqueId}` }}>
                                                <FaRegEye className="UList" style={{ fontSize: '2em' }} />
                                              </Link>
                                            </div>
                                            <div className="col-4" align='right' style={{ marginRight: '8px' }}>
                                              <Link aria-current="page" to={{ pathname: `/Login?listId=${element.uniqueId}` }}>
                                                <FaUserEdit className="UListData" style={{ fontSize: '2em' }} /></Link>
                                            </div>
                                            <div className="col-4" align='right' style={{ marginRight: '2px' }}>
                                              <Link style={{ marginLeft: 'auto' }} aria-current="page" to={{ pathname: `/Login?listId=${element.uniqueId}&delete=yes` }}>
                                                <MdDelete style={{ color: 'red', fontSize: '2em' }} /></Link>
                                            </div></div></>

                                    }}
                                  </Media>

                              }}
                            </Media>
                        }}
                      </Media>







                    </li>

                  }) :
                    cuser.map((e) => { return <li className="list-group-item luser" key='just'><h2 style={{ alignItems: 'center' }}>No List found</h2></li> })
                }
              </ul>
            </div>

          </div>
        </div>





        {/*         
        
        <div className="card" style={{ marginTop: "25px", marginBottom: "25px" }}>
          <div className="card-header">
            <h2>Lists</h2>
          </div>
          <ul className="list-group list-group-flush">

            {
              list.length !== 0 ? list.map((element) => {
                return <li className="list-group-item" key={element.uniqueId}>
                  <div className='usericon'>{element.name[0]} </div>
                  <div className="d-flex flex-column bd-highlight mb-3" style={{ position: 'absolute', paddingLeft: '60px' }}>
                    <h1> {element.name}</h1>
                    <h3> Created by {element.createdBy}</h3>
                  </div>
                  <Link aria-current="page" to={{ pathname: `/SeeListUser?listId=${element.uniqueId}` }}>
                    <FaRegEye className="UList" />
                  </Link>
                  <Link aria-current="page" to={{ pathname: `/Login?listId=${element.uniqueId}` }}>
                    <FaUserEdit className="UListData" /></Link>
                  <Link style={{ marginLeft: 'auto' }} aria-current="page" to={{ pathname: `/Login?listId=${element.uniqueId}&delete=yes` }}>
                    <MdDelete style={{ color: 'red', fontSize: '4em' }} /></Link>
                </li>
              }) :
                cuser.map((e) => { return <li className="list-group-item luser" key='just'><h2 style={{ alignItems: 'center' }}>No List found</h2></li> })
            }
          </ul>
        </div> */}
      </div >
    </>
  )
}

export default Front




{/* <div className="row">
          <h1 align='center' style={{ marginTop: '10px' }}>Customer Success Managers</h1></div>
        <div className="row">
          <div className="col-md-1">
            <Link aria-current="page" to={{ pathname: "/Adduser" }}>
              <button type="button" className="btn btn-dark Uadd">Add Yourself to Company's Database</button></Link>
          </div>
        </div>

        <Link aria-current="page" to="/Login">
          <button type="button" className="btn btn-dark Ladd" onClick={GoLogin}>Create List</button></Link>
        <form className="d-flex">
          <input className="form-control me-2 lsearch" type="text" onChange={addList} value={text} placeholder="Search Lists" aria-label="Search" style={{ position: 'relative', marginTop: '20px' }}></input>
        </form> */}