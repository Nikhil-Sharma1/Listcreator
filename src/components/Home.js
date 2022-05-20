
import React, { useEffect, useState, useRef } from 'react'
import { MdDelete } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import { FaUserEdit } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { GoPrimitiveDot } from 'react-icons/go'
import { FaRegEye } from 'react-icons/fa'
import {
  Link
} from "react-router-dom";
import Media from 'react-media'
function Home() {
  const ref = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const listId = searchParams.get("listId");
  const [display, setDisplay] = useState('none')
  const [text, setText] = useState("");
  const [user, setUser] = useState([]);
  const [cuser, setCuser] = useState([{ name: "no user found" }]);
  const [slist, setSlist] = useState([]);
  const [luser, setLuser] = useState([]);
  const [scount, setScount] = useState([]);
  const [lname, setLname] = useState({ name: '', uniqueId: '' });
  useEffect(() => {
    const fetchlistuser = async () => {
      try {
        const res = await fetch('/getluser',
          {
            method: "POST",
            headers:
            {
              "Content-Type": "application/json"
            },
            body: JSON.stringify
              ({
                listId
              })
          });
        const data = await res.json();
        if (res.status === 201) {
          setLuser(data);
          setLname({
            name: data[0].lname,
            uniqueId: data[0].luniqueId
          });
          // console.log(luser);
        }
        else if (res.status === 202) {
          setLname({
            name: data[0].name,
            uniqueId: data[0].uniqueId
          });
          //console.log(data[0]._id);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchlistuser();
    const handleClickOutside = (event) => {
      if (display === "block") {
        if (ref.current && !ref.current.contains(event.target)) {
          setDisplay('none');
          setText("");
        }
      }
      else {
        console.log('no');
        // console.log(display);
      }
    }
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }

  }, [display, listId, slist]);
  const [list, setList] = useState({ name: "" });
  let name, value;
  const handleInputs = async (e) => {
    setText(e.target.value);

    try {
      const res = await fetch('/getuser',
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
        setUser(data);
      }
      else if (res.status === 202) {
        setUser([]);
      }
    } catch (err) {
      console.log(err);
    }

  }
  const openBox = async () => {
    setDisplay('block');
    try {
      const res = await fetch('/getuser',
        {
          method: "POST",
          headers:
          {
            "Content-Type": "application/json"
          },
          body: JSON.stringify
            ({
              pattern: ''
            })
        });
      const data = await res.json();
      if (res.status === 201) {
        setUser(data);
      }
      else if (res.status === 202) {
        setUser([]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const displayOnTopList = (e) => {
    // console.log(e.fname);
    let newList = slist.some((item) => item.email === e.email);
    if (!newList) {
      newList = slist.concat(e);
      setSlist(newList);
    }
  }
  const deletesuser = (e) => {
    const newList = slist.filter((item) => item.email !== e.email);
    setSlist(newList);
  }

  const addLuser = (e) => {
    e.preventDefault();
    // console.log(lname.name);
    // console.log(lname.uniqueId);
    slist.map(async (element) => {
      const name = lname.name;
      const luniqueId = lname.uniqueId;
      const uuniqueId = element.uniqueId;
      const ufname = element.fname;
      const ulname = element.lname;
      try {
        const res = await fetch('/addlistuser',
          {
            method: "POST",
            headers:
            {
              "Content-Type": "application/json"
            },
            body: JSON.stringify
              ({
                name,
                luniqueId,
                uuniqueId,
                ufname,
                ulname
              })
          });
        const data = await res.json();
        if (res.status === 201) {
          setLuser(data);
          console.log("saved");
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    })
    setSlist([]);
    setUser([]);

  }
  const deleteuser = async (e) => {
    const uuniqueId = e;
    console.log(e);
    try {
      const res = await fetch('/dellistuser',
        {
          method: "POST",
          headers:
          {
            "Content-Type": "application/json"
          },
          body: JSON.stringify
            ({
              listId,
              uuniqueId
            })
        });
      const data = await res.json();
      if (res.status === 201) {
        setLuser(data);
      }
      else {
        console.log('not deleted');
      }

    } catch (err) {
      console.log(err);
    }
  }
  // console.log(luser);

  return (
    <>
      <div className='h-100 container bg-success'>
        <h1 align='center' style={{ marginTop: '10px' }} >{lname.name}</h1>
        <form className="d-flex">
          <input className="form-control me-2 lsearch" type="text" value={text} name="Search" placeholder="Add by name or email" aria-label="Search" onChange={handleInputs} onClick={openBox}></input>
          <button className="lbutton" type="submit" onClick={addLuser}>Add</button>
        </form>
        <div className='wrapper'>
          <div className="auser card" >
            <div className="card-header">
              <h2>Users</h2>
            </div>
            <ul className="list-group list-group-flush" style={{ background: 'white' }}>
              {
                luser.length !== 0 ? luser.map((element) => {
                  return <li className="list-group-item" key={element._id}>
                    <div className='usericon'>{element.user[0].fname[0]}{element.user[0].lname[0]} </div>
                    <div className="d-flex flex-column bd-highlight mb-3" style={{ position: 'relative', marginLeft: '10px' }}>
                      <h1> {element.user[0].fname} {element.user[0].lname}</h1>
                      <h3> {element.user[0].designation} </h3>
                    </div>
                    <Media query="(min-width:370px)" key='20'>
                      {matches => {
                        return matches ? <>
                          <Link aria-current="page" to={{ pathname: `/UserDetails?luserid=${element.user[0].uniqueId}&admin="yes"` }} style={{ marginBottom: '35px' }}>
                            <FaRegEye className="UListDatas" style={{ fontSize: '4em', marginRight: '60px' }} /></Link>
                          <MdDelete style={{ color: 'red', fontSize: '4em', marginLeft: 'auto', cursor: 'pointer' }} onClick={() => deleteuser(element.uuniqueId)} />
                        </> :
                          <Media query="(min-width:340px)" key='20'>
                            {matches => {
                              return matches ? <>
                                <Link aria-current="page" to={{ pathname: `/UserDetails?luserid=${element.user[0].uniqueId}&admin="yes"` }} style={{ marginBottom: '35px' }}>
                                  <FaRegEye className="UListDatas" style={{ fontSize: '3em', marginRight: '60px', marginTop: '2px' }} /></Link>
                                <MdDelete style={{ color: 'red', fontSize: '3em', marginLeft: 'auto', cursor: 'pointer' }} onClick={() => deleteuser(element.uuniqueId)} />
                              </> :
                                <Media query="(min-width:290px)" key='20'>
                                  {matches => {
                                    return matches ? <>
                                      <Link aria-current="page" to={{ pathname: `/UserDetails?luserid=${element.user[0].uniqueId}&admin="yes"` }} style={{ marginBottom: '35px' }}>
                                        <FaRegEye className="UListDatas" style={{ fontSize: '2em', marginRight: '40px', marginTop: '7px' }} /></Link>
                                      <MdDelete style={{ color: 'red', fontSize: '2em', marginLeft: 'auto', cursor: 'pointer' }} onClick={() => deleteuser(element.uuniqueId)} />
                                    </> :
                                      <>
                                        <Link aria-current="page" to={{ pathname: `/UserDetails?luserid=${element.user[0].uniqueId}&admin="yes"` }} style={{ marginBottom: '35px' }}>
                                          <FaRegEye className="UListDatas" style={{ fontSize: '1.5em', marginRight: '30px', marginTop: '10px' }} /></Link>
                                        <MdDelete style={{ color: 'red', fontSize: '1.5em', marginLeft: 'auto', cursor: 'pointer' }} onClick={() => deleteuser(element.uuniqueId)} />
                                      </>
                                  }}
                                </Media>
                            }}
                          </Media>

                      }}
                    </Media>

                  </li>
                }) :
                  cuser.map((e) => { return <li className="list-group-item luser" key='just'><h2 style={{ alignItems: 'center' }}>no user found</h2></li> })
              }
            </ul>
          </div>
          <div className="select card" style={{ display: display }} ref={ref} >
            <div className="suser form-group" style={{ display: slist.length === 0 ? 'none' : 'flex' }} >
              {
                slist ? slist.map((element) => {
                  return <div className='seuser' onClick={() => deletesuser(element)} key={element._id}>{element.fname} {element.lname}</div>
                }) : cuser.map((e) => { return <li className="list-group-item" key='me' ><h2 style={{ alignItems: 'center' }}>no user found</h2></li> })
              }
            </div>
            <ul className="list-group list-group-flush" key='2'>
              {
                user.length !== 0 ? user.map((element) => {
                  // console.log("i" + element);
                  return <li className="list-group-item luser" onClick={() => displayOnTopList(element)} key={element.uniqueId}>
                    <img className="img-fluid" src={require('./spot.jpeg')} alt="not found" style={{ height: '45px', width: '45px' }}></img>
                    <div className="d-flex flex-column bd-highlight mb-3" style={{ position: 'relative', marginLeft: '10px' }}>
                      <h1> {element.fname} {element.lname}</h1>
                      <h3> <FaUser style={{ marginBottom: '8px' }} />{element.designation} <GoPrimitiveDot style={{ marginBottom: '3px' }} />{element.email}</h3>
                    </div>
                  </li>
                }) :
                  cuser.map((e) => { return <li className="list-group-item luser" key='us'><h1 style={{ alignItems: 'center' }}>no user found</h1></li> })
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
