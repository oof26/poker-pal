import React from 'react';
import Cookies from 'universal-cookie';

export function Logout(){
  return(
    <div>
      <p><b>LOGOUT</b></p>
      <button className="Login-button" onClick={doLogout}>LOGOUT</button>
    </div>
  )
}

function doLogout() {
  const cookies = new Cookies();
  cookies.remove('loggedIn')
  window.location.reload(true)
}