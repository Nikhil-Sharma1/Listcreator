//rfce
import React, { useEffect, useState } from 'react'
import {
  Link
} from "react-router-dom";
import Media from 'react-media'

function Navbar() {
  const [cuser, setCuser] = useState([{ name: "no user found" }]);
  const [Width, setWidth] = useState(null);
  const [Height, setHeight] = useState(null);
  useEffect(() => {
    if (window.innerWidth > 311) {
      setWidth('70px');
      setHeight('70px');
    }
    else if (window.innerWidth > 311) {
      setWidth('60px');
      setHeight('60px');
    }
    else {
      setWidth('50px');
      setHeight('50px');
    }
    const setsize = () => {
      // console.log(width);
      if (window.innerWidth > 311) {
        setWidth('70px');
        setHeight('70px');
      }
      else if (window.innerWidth > 250) {
        setWidth('60px');
        setHeight('60px');
      }
      else {
        setWidth('55px');
        setHeight('55px');
      }
    }
    window.addEventListener('resize', setsize);
    return () => window.removeEventListener('resize', setsize);
  }, [window.innerWidth])
  return (
    <nav className={`navbar navbar-expand-lg`} key='1' >
      <div className="container-fluid" key='2'>
        <div className="w-100 row" key='3'>
          <div className=" col-4 col-sm-2 col-md-2 col-lg-1 col-xl" key='4'>
            <img src={require('./spot.jpeg')} style={{ height: Height, width: Width, position: 'relative' }} alt="not found" key='5'></img>
          </div>
          <div className="col-5 col-sm-6 col-md-6 col-lg-7 col-xl-10" style={{ marginBottom: '10px' }} key='6'>
            <Media query="(min-width:361px)" key='7'>
              {matches => {
                return matches ? cuser.map(() => { return <h2 key='8'> Your Spottabl Team</h2> }) :
                  <Media query="(min-width:299px)" key='20'>
                    {matches => {
                      return matches ? cuser.map(() => { return <h3 key='21'> Your Spottabl Team</h3> }) :
                        <Media query="(min-width:299px)" key='20'>
                          {matches => {
                            return matches ? cuser.map(() => { return <h3 key='21'> Your Spottabl Team</h3> }) : cuser.map(() => { return <h5 key='9'> Your Spottabl Team </h5> })
                          }}
                        </Media>
                    }}
                  </Media>
              }}
            </Media>
            <Media query="(min-width:361px)" key='10'>
              {matches => {
                return matches ? cuser.map(() => { return <h4 key='11'> Spottabl supports you all throughout</h4> }) :
                  <Media query="(min-width:299px)" key='20'>
                    {matches => {
                      return matches ? cuser.map(() => { return <h5 key='12'> Spottabl supports you all throughout</h5> }) :
                        <Media query="(min-width:251px)" key='20'>
                          {matches => {
                            return matches ? cuser.map(() => { return <h5 key='12'> Spottabl supports you all throughout</h5> }) : cuser.map(() => { return <h6 key='12'> Spottabl supports you all throughout</h6> })
                          }}
                        </Media>

                    }}
                  </Media>

              }}
            </Media>
          </div>
          <Media query="(min-width:276px)" key='20'>
            {matches => {
              return matches ? <div className="col col-sm col-md col-lg col-xl" align='right' key='13'>
                <Link aria-current="page" to={{ pathname: "/" }} key='14'>
                  <button type="button" className="edit" style={{ marginLeft: 'auto' }} key='15'>Home</button></Link>
              </div> : <div className="col col-sm col-md col-lg col-xl" align='right' key='13'>
                <Link aria-current="page" to={{ pathname: "/" }} key='14'>
                  <button type="button" className="edit" style={{ marginLeft: 'auto', fontSize: '5px' }} key='15'>Home</button></Link>
              </div>
            }}
          </Media>


        </div>

      </div>
    </nav >
  )
}

export default Navbar






















// //rfce
// import React from 'react'
// import {
//   Link
// } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className={` navbar navbar-expand-lg `} style={{ backgroundColor: 'dark', height: '10%' }} >
//       <div className="container-fluid">
//         <img className=" class=navbar-brand img-fluid" src={require('./spot.jpeg')} alt="not found" style={{ position: 'relative' }}></img>
//         <div className="d-flex flex-column bd-highlight mb-3" style={{ position: 'relative', paddingLeft: '' }}>
//           <h1 style={{ fontSize: '3em' }}> Your Spottabl Team</h1>
//           <h3 style={{ fontSize: '2em' }}> Spottabl supports you all throughout</h3>
//         </div>

//       </div>
//     </nav >
//   )
// }

// export default Navbar

