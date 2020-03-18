import {Header, Footer} from './index';


const Layout = props => (
  <div className="layout">
    <Header lang={props.lang}/>

    <main>      
      {props.children}
    </main>

    <Footer lang={props.lang}>
      
    </Footer>

  </div>
);

export {Layout};
