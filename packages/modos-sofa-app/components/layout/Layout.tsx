import React from 'react';


const Layout = props =>
  <div className='layout'>

    <main>
      {props.children}
    </main>


  </div>
;

export { Layout };
