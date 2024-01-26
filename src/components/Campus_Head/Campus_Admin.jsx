import React, { useState } from 'react';
import CreateUser from './CreateUser';
import CampusHome from './CampusHome';
import CampusDash from './Campus_Dashboard';
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";


function CampusAdmin() {
  
  const [campus, setCampus] = useState(null);
  const [user, setUser] = useState(null);
  const [isUser,setIsUser] = useState(false);
  const [isHome,setIsHome] = useState(true);
  const users = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const handleCampusSubmit = (newCampus) => {
    setCampus(newCampus);
  };
  const handleUserSubmit = (newUser) => {
    setUser(newUser);
  };


  const handleUser =() =>{
    setIsUser(true);
    setIsHome(false)
  }

  const handlehome =() =>{
    setIsUser(false);
    setIsHome(true)
  }

  const handlelogout =() =>{
    dispatch(userAction.logout());
  }
  return (
    <div>
      {/* <NavBar /> */}
      <nav style={{ padding: '20px', backgroundColor: '#eee',justifyContent:'start' , display:'flex', flexDirection:'row' }}>
      <img style={{paddingLeft:'10px',paddingRight:'20px'}} src={'../../../assets/logo1.png'} className="w-20" 
      onClick={()=> handlehome()}  
     />
       <button style={{paddingLeft:'10px',paddingRight:'30px' }}
          onClick={()=> handlehome()}
          > <p style={{fontSize:16, fontWeight:'bold'}}>Home </p></button>

          <button style={{paddingLeft:'20px',paddingRight:'30px' }}
           onClick={() => handleUser()}
          ><p style={{fontSize:16, fontWeight:'bold'}}>Create User </p></button>
  
          <button style={{textAlign:'right'}}
          onClick={() => handlelogout()}
          > <p style={{fontSize:16, fontWeight:'bold'}}>Logout </p></button>
    </nav>
      <div style={{ padding: '20px' }}>
       {isUser?  <CreateUser  onSubmit={handleCampusSubmit} /> :<div> </div>}             
      <div>
        {isHome ?<CampusDash />  : null }
          {/* <h2>Current Campus:</h2>
          <pre>{JSON.stringify(campus, null, 2)}</pre>
          <h2>Current User:</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
}

export default CampusAdmin;
