import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {
  Link
} from "react-router-dom";
import Media from 'react-media'
function Userdetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const luserId = searchParams.get("luserid");
  const admin = searchParams.get("admin");
  const [userdata, setUserdata] = useState([]);
  const [cuser, setCuser] = useState([{ name: 'no user' }]);
  const navigate = useNavigate();

  //console.log(luserId);
  useEffect(() => {
    const fetchlist = async () => {
      try {
        const res = await fetch('/getuserdata',
          {
            method: "POST",
            headers:
            {
              "Content-Type": "application/json"
            },
            body: JSON.stringify
              ({
                luserId
              })
          });
        const data = await res.json();
        //console.log(data);
        if (res.status === 201) {
          setUserdata(data);
        }
        else {
          window.alert("no data found");
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchlist();
  }, [])
  // console.log(userdata);
  const updateUser = async (e) => {
    e.preventDefault();
    if (admin) {
      navigate(`/UpdateUser?uniqueid=${luserId}&admin=yes`);
    }
    else {
      navigate(`/Login?uniqueid=${luserId} `);
    }
  }
  return (
    <>
      <Media query="(min-width:450px)" key='7'>
        {matches => {
          return matches ?
            <div className='container emp-profile' style={{ background: 'white', width: 'fit-content', height: '440px' }}>
              <form method="">
                <div className='row'>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{ marginTop: '30px' }} align='right'>
                    <input type="submit" className="edit" value="Edit Profile" onClick={updateUser} />
                  </div>
                  <div className='col-5 col-sm-4 col-md-3 col-lg-3 col-xl-3'>
                    <div className='usericons' style={{ width: '150px', height: '150px', lineHeight: '150px' }}>
                      {
                        userdata.length !== 0 ? userdata.map((userdata) => {
                          return userdata.fname[0] + userdata.lname[0];
                        }) : cuser.map(() => { return 'fetching...' })
                      }
                    </div>
                  </div>
                  <div className='col col-sm col-md-6 col-lg-7 col-xl-7'>
                    <div className='profile-head' style={{ marginTop: '90px', marginLeft: '2px' }}>
                      <h1>
                        {
                          userdata.length !== 0 ? userdata.map((userdata) => {
                            return userdata.fname + ' ' + userdata.lname;
                          }) : cuser.map(() => { return 'fetching...' })
                        }
                      </h1>
                      <h3>
                        {
                          userdata.length !== 0 ? userdata.map((userdata) => {
                            return userdata.designation;
                          }) : cuser.map(() => { return 'fetching...' })
                        } </h3>
                    </div>
                  </div>

                  <div className="col-12 col-sm-12 col-md-8 pl-5 about-info">
                    <div className='teb-content'>
                      <div className='tab-pane show active' id="home" style={{ marginLeft: '2%' }}>
                        <div className='row'>
                          <div className='col-5 col-sm-5 col-md-5'>
                            <label><h3>Id</h3></label>
                          </div>
                          <div className='col-7 col-sm-7 col-md-7'>
                            <h4>
                              {
                                userdata.length !== 0 ? userdata.map((userdata) => {
                                  return userdata.uniqueId
                                }) : cuser.map(() => { return 'fetching...' })
                              }
                            </h4>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-5 col-sm-5 col-md-5'>
                            <label><h3>Email</h3></label>
                          </div>
                          <div className='col-7 col-sm-7 col-md-7'>
                            <h4>
                              {
                                userdata.length !== 0 ? userdata.map((userdata) => {
                                  return userdata.email;
                                }) : cuser.map(() => { return 'fetching...' })
                              }
                            </h4>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-5 col-sm-5 col-md-5'>
                            <label><h3>Phone</h3></label>
                          </div>
                          <div className='col-7 col-sm-7 col-md-7'>
                            <h4>
                              {
                                userdata.length !== 0 ? userdata.map((userdata) => {
                                  return userdata.phone;
                                }) : cuser.map(() => { return 'fetching...' })
                              }
                            </h4>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-5 col-sm-5 col-md-5'>
                            <label><h3>Address</h3></label>
                          </div>
                          <div className='col-7 col-sm-7 col-md-7'>
                            <h4>
                              {
                                userdata.length !== 0 ? userdata.map((userdata) => {
                                  return userdata.address;
                                }) : cuser.map(() => { return 'fetching...' })
                              }
                            </h4>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-5 col-sm-5 col-md-5'>
                            <label><h3>Create List</h3></label>
                          </div>
                          <div className='col-7 col-sm-7 col-md-6'>
                            <h4>
                              {
                                userdata.length !== 0 ? userdata.map((userdata) => {
                                  return userdata.createList;
                                }) : cuser.map(() => { return 'fetching...' })
                              }
                            </h4>
                          </div>
                        </div>
                        {/* <div className='row'>
                                  <div className='col-md-5'>
                                    <label><h3>Add User</h3></label>
                                  </div>
                                  <div className='col-md-6'>
                                    <h4>
                                      {
                                        userdata.length !== 0 ? userdata.map((userdata) => {
                                          return userdata.addUser;
                                        }) : cuser.map(() => { return 'fetching...' })
                                      }
                                    </h4>
                                  </div>
                                </div> */}

                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div> :
            <Media query="(min-width:405px)" key='20'>
              {matches => {
                return matches ? <div className='container emp-profile' style={{ background: 'white', width: 'fit-content', height: '440px' }}>
                  <form method="">
                    <div className='row'>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{ marginTop: '30px' }} align='right'>
                        <input type="submit" className="edit" value="Edit Profile" onClick={updateUser} />
                      </div>
                      <div className='col-5 col-sm-4 col-md-3 col-lg-3 col-xl-3'>
                        <div className='usericons' style={{ width: '120px', height: '120px', lineHeight: '120px' }}>
                          {
                            userdata.length !== 0 ? userdata.map((userdata) => {
                              return userdata.fname[0] + userdata.lname[0];
                            }) : cuser.map(() => { return 'fetching...' })
                          }
                        </div>
                      </div>
                      <div className='col col-sm col-md-6 col-lg-7 col-xl-7'>
                        <div className='profile-head' style={{ marginTop: '50px', marginLeft: '2px' }}>
                          <h1>
                            {
                              userdata.length !== 0 ? userdata.map((userdata) => {
                                return userdata.fname + ' ' + userdata.lname;
                              }) : cuser.map(() => { return 'fetching...' })
                            }
                          </h1>
                          <h3>
                            {
                              userdata.length !== 0 ? userdata.map((userdata) => {
                                return userdata.designation;
                              }) : cuser.map(() => { return 'fetching...' })
                            } </h3>
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-8 pl-5 about-info">
                        <div className='teb-content'>
                          <div className='tab-pane show active' id="home" style={{ marginLeft: '2%' }}>
                            <div className='row'>
                              <div className='col-5 col-sm-5 col-md-5'>
                                <label><h3>Id</h3></label>
                              </div>
                              <div className='col-7 col-sm-7 col-md-7'>
                                <h5>
                                  {
                                    userdata.length !== 0 ? userdata.map((userdata) => {
                                      return userdata.uniqueId
                                    }) : cuser.map(() => { return 'fetching...' })
                                  }
                                </h5>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-5 col-sm-5 col-md-5'>
                                <label><h3>Email</h3></label>
                              </div>
                              <div className='col-7 col-sm-7 col-md-7'>
                                <h5>
                                  {
                                    userdata.length !== 0 ? userdata.map((userdata) => {
                                      return userdata.email;
                                    }) : cuser.map(() => { return 'fetching...' })
                                  }
                                </h5>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-5 col-sm-5 col-md-5'>
                                <label><h3>Phone</h3></label>
                              </div>
                              <div className='col-7 col-sm-7 col-md-7'>
                                <h5>
                                  {
                                    userdata.length !== 0 ? userdata.map((userdata) => {
                                      return userdata.phone;
                                    }) : cuser.map(() => { return 'fetching...' })
                                  }
                                </h5>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-5 col-sm-5 col-md-5'>
                                <label><h3>Address</h3></label>
                              </div>
                              <div className='col-7 col-sm-7 col-md-7'>
                                <h5>
                                  {
                                    userdata.length !== 0 ? userdata.map((userdata) => {
                                      return userdata.address;
                                    }) : cuser.map(() => { return 'fetching...' })
                                  }
                                </h5>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-5 col-sm-5 col-md-5'>
                                <label><h3>Create List</h3></label>
                              </div>
                              <div className='col-7 col-sm-7 col-md-6'>
                                <h5>
                                  {
                                    userdata.length !== 0 ? userdata.map((userdata) => {
                                      return userdata.createList;
                                    }) : cuser.map(() => { return 'fetching...' })
                                  }
                                </h5>
                              </div>
                            </div>
                            {/* <div className='row'>
                                <div className='col-md-5'>
                                  <label><h3>Add User</h3></label>
                                </div>
                                <div className='col-md-6'>
                                  <h4>
                                    {
                                      userdata.length !== 0 ? userdata.map((userdata) => {
                                        return userdata.addUser;
                                      }) : cuser.map(() => { return 'fetching...' })
                                    }
                                  </h4>
                                </div>
                              </div> */}

                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div> :
                  <div className='container emp-profile' style={{ background: 'white', width: 'fit-content', height: '440px' }}>
                    <form method="">
                      <div className='row'>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{ marginTop: '30px' }} align='right'>
                          <input type="submit" className="edit" value="Edit Profile" onClick={updateUser} />
                        </div>
                        <div className='col-5 col-sm-4 col-md-3 col-lg-3 col-xl-3'>
                          <div className='usericons' style={{ width: '100px', height: '100px', lineHeight: '100px' }}>
                            {
                              userdata.length !== 0 ? userdata.map((userdata) => {
                                return userdata.fname[0] + userdata.lname[0];
                              }) : cuser.map(() => { return 'fetching...' })
                            }
                          </div>
                        </div>
                        <div className='col col-sm col-md-6 col-lg-7 col-xl-7'>
                          <div className='profile-head' style={{ marginTop: '50px', marginLeft: '2px' }}>
                            <h1>
                              {
                                userdata.length !== 0 ? userdata.map((userdata) => {
                                  return userdata.fname + ' ' + userdata.lname;
                                }) : cuser.map(() => { return 'fetching...' })
                              }
                            </h1>
                            <h3>
                              {
                                userdata.length !== 0 ? userdata.map((userdata) => {
                                  return userdata.designation;
                                }) : cuser.map(() => { return 'fetching...' })
                              } </h3>
                          </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-8 pl-5 about-info">
                          <div className='teb-content'>
                            <div className='tab-pane show active' id="home" style={{ marginLeft: '2%' }}>
                              <div className='row'>
                                <div className='col-5 col-sm-5 col-md-5'>
                                  <label><h3>Id</h3></label>
                                </div>
                                <div className='col-7 col-sm-7 col-md-7'>
                                  <h6>
                                    {
                                      userdata.length !== 0 ? userdata.map((userdata) => {
                                        return userdata.uniqueId
                                      }) : cuser.map(() => { return 'fetching...' })
                                    }
                                  </h6>
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-5 col-sm-5 col-md-5'>
                                  <label><h3>Email</h3></label>
                                </div>
                                <div className='col-7 col-sm-7 col-md-7'>
                                  <h6>
                                    {
                                      userdata.length !== 0 ? userdata.map((userdata) => {
                                        return userdata.email;
                                      }) : cuser.map(() => { return 'fetching...' })
                                    }
                                  </h6>
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-5 col-sm-5 col-md-5'>
                                  <label><h3>Phone</h3></label>
                                </div>
                                <div className='col-7 col-sm-7 col-md-7'>
                                  <h6>
                                    {
                                      userdata.length !== 0 ? userdata.map((userdata) => {
                                        return userdata.phone;
                                      }) : cuser.map(() => { return 'fetching...' })
                                    }
                                  </h6>
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-5 col-sm-5 col-md-5'>
                                  <label><h3>Address</h3></label>
                                </div>
                                <div className='col-7 col-sm-7 col-md-7'>
                                  <h6>
                                    {
                                      userdata.length !== 0 ? userdata.map((userdata) => {
                                        return userdata.address;
                                      }) : cuser.map(() => { return 'fetching...' })
                                    }
                                  </h6>
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-5 col-sm-5 col-md-5'>
                                  <label><h3>Create List</h3></label>
                                </div>
                                <div className='col-7 col-sm-7 col-md-6'>
                                  <h6>
                                    {
                                      userdata.length !== 0 ? userdata.map((userdata) => {
                                        return userdata.createList;
                                      }) : cuser.map(() => { return 'fetching...' })
                                    }
                                  </h6>
                                </div>
                              </div>
                              {/* <div className='row'>
                               <div className='col-md-5'>
                                 <label><h3>Add User</h3></label>
                               </div>
                               <div className='col-md-6'>
                                 <h4>
                                   {
                                     userdata.length !== 0 ? userdata.map((userdata) => {
                                       return userdata.addUser;
                                     }) : cuser.map(() => { return 'fetching...' })
                                   }
                                 </h4>
                               </div>
                             </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
              }}
            </Media>

        }}
      </Media>
    </>
  )
}

export default Userdetails
