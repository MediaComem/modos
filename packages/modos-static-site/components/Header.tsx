import Link from 'next/link';
import React from 'react'

interface Props{}
interface State{
  changeLanguage
}

class Header extends React.Component<Props, State> {
  componentDidMount() {
    this.setState({
      changeLanguage: lang => {
        console.log(lang)
        localStorage.setItem('lang', lang); 
        window.location.reload();       
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = { changeLanguage: undefined };
  }

  render() {
    if (!this.state.changeLanguage) return <div>loading...</div>;

    return (
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about/">
          <a>About</a>
        </Link>
        
        <div>
          <button onClick={(e)=>this.state.changeLanguage('en')}>en</button>
          <button onClick={(e)=>this.state.changeLanguage('fr')}>fr</button>
        </div>
      </div>
    );
  }
}

export {Header};
