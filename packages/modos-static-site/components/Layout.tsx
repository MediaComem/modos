import {Header} from './index';


const Layout = props => (
  <div className="layout">
    <Header lang={props.lang}/>

    <main>      
      {props.children}
    </main>

    <footer>
      
    </footer>

  </div>
);

export {Layout};
