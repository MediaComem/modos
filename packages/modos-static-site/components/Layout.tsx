import {Header} from './index';


const Layout = props => (
  <div className="layout">
    <Header lang={props.lang}/>

    <main>
      
    </main>

    <footer>
      
    </footer>

    {props.children}
  </div>
);

export {Layout};
