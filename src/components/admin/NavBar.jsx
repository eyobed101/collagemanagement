import React from 'react';

function NavBar() {
  return (
    <nav style={{ padding: '20px', backgroundColor: '#eee',justifyContent:'space-between' }}>
          <button style={{paddingLeft:'20px',paddingRight:'30px' }}> <p style={{fontSize:16, fontWeight:'bold'}}>Home </p></button>
          <button style={{paddingLeft:'20px',paddingRight:'30px' }}><p style={{fontSize:16, fontWeight:'bold'}}>Create Campus </p> </button>
          <button style={{paddingLeft:'20px',paddingRight:'30px' }}><p style={{fontSize:16, fontWeight:'bold'}}>Create Centeral registerar </p></button>
          {/* <button>Logout</button> */}
          <button style={{textAlign:'right'}}> <p style={{fontSize:16, fontWeight:'bold'}}>Logout </p></button>
    </nav>
  );
}

export default NavBar;
