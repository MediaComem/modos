import Link from 'next/link';
import React from 'react';
import { i18n } from '../libs';

class Page {
  name;
  link;

  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
}

const PAGE_LIST: Page[] = [
  new Page('homepage', '/'),
  new Page('about', '/about')
];

interface Props {
  lang;
}
interface State {
  changeLanguage;
}

class Header extends React.Component<Props, State> {
  componentDidMount() {
    this.setState({
      changeLanguage: lang => {
        console.log(lang);
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
      <header className="navbar">
        <div className="menu">
          {PAGE_LIST.map(page => (
            <Link href={page.link}>
              <a>{i18n('header', page.name, this.props.lang)}</a>
            </Link>
          ))}
        </div>

        <div className="language">
          <button>EN \/</button>
          <ul className="languageList">
            <li>
              <button onClick={e => this.state.changeLanguage('en')}>en</button>
            </li>
            <li>
              <button onClick={e => this.state.changeLanguage('fr')}>fr</button>
            </li>
          </ul>
        </div>

        <div className="navMenuIcon">
          <a>
            <i className="material-icons md-36">menu</i>
          </a>
        </div>
      </header>
    );
  }
}

export { Header };
