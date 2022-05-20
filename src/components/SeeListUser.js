
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FaRegEye } from 'react-icons/fa'
import {
  Link
} from "react-router-dom";
function Home() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const listId = searchParams.get("listId");
  const [cuser, setCuser] = useState([{ name: "no user found" }]);
  const [luser, setLuser] = useState([]);
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
  }, [listId]);




  return (
    <>
      <div className=' container bg-success' style={{ marginTop: '30px' }}>
        <h1 align='center' style={{ marginTop: '10px' }}>{lname.name}</h1>
        <div className='wrapper'>
          <div className="auser card" >
            <div className="card-header">
              <h2>Users</h2>
            </div>
            <ul className="list-group list-group-flush" style={{ background: 'aliceblue' }}>
              {
                luser.length !== 0 ? luser.map((element) => {
                  return <li className="list-group-item" key={element._id}>
                    <div className='usericon'>{element.user[0].fname[0]}{element.user[0].lname[0]} </div>
                    <div className="d-flex flex-column bd-highlight mb-3" style={{ position: 'relative', marginLeft: '10px' }}>
                      <h1> {element.user[0].fname} {element.user[0].lname}</h1>
                      <h3> {element.user[0].designation} </h3>
                    </div>
                    <Link aria-current="page" to={{ pathname: `/UserDetails?luserid=${element.user[0].uniqueId}` }} style={{ marginLeft: 'auto' }}>
                      <FaRegEye style={{ color: 'red', fontSize: '4em', cursor: 'pointer' }} /></Link>
                  </li>
                }) :
                  cuser.map((e) => { return <li className="list-group-item luser" key='just'><h2 style={{ alignItems: 'center' }}>no user found</h2></li> })
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
