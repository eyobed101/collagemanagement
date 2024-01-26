import React, { useState } from 'react';
import CampusForm from './CampusForm';
import UserForm from './UserForm';
import RootHome from './RootHome';
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";


function RootAdmin() {
  
  const [campus, setCampus] = useState(null);
  const [user, setUser] = useState(null);
  const [isCampus,setIsCampuses] = useState(false);
  const [isCenterRegister,setIsCenterRegister] = useState(false);
  const [isHome,setIsHome] = useState(true);
  const users = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const handleCampusSubmit = (newCampus) => {
    setCampus(newCampus);
  };
  const handleUserSubmit = (newUser) => {
    setUser(newUser);
  };

  const handlecampus =() =>{
    setIsCampuses(true);
    setIsCenterRegister(false)
    setIsHome(false)
  }
  const handleUser =() =>{
    setIsCampuses(false);
    setIsCenterRegister(true)
    setIsHome(false)
  }

  const handlehome =() =>{
    setIsCampuses(false);
    setIsCenterRegister(false)
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
          onClick={()=> handlecampus()}
          ><p style={{fontSize:16, fontWeight:'bold'}}>Create Campus </p> </button>
          <button style={{paddingLeft:'20px',paddingRight:'30px' }}
           onClick={() => handleUser()}
          ><p style={{fontSize:16, fontWeight:'bold'}}>Create user </p></button>
          {/* <button>Logout</button> */}
          <button style={{textAlign:'right'}}
          onClick={() => handlelogout()}
          > <p style={{fontSize:16, fontWeight:'bold'}}>Logout </p></button>
    </nav>
      <div style={{ padding: '20px' }}>
       {isCampus?  < CampusForm onSubmit={handleCampusSubmit} /> :<div> </div>}
       {isCenterRegister? <UserForm onSubmit={handleUserSubmit} />  : null}                 
      <div>
        {isHome ?<RootHome />  : null }
          {/* <h2>Current Campus:</h2>
          <pre>{JSON.stringify(campus, null, 2)}</pre>
          <h2>Current User:</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
}

export default RootAdmin;
