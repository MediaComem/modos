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
  displayMenu;
  selectedLanguage;
}

class Header extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      changeLanguage: undefined,
      displayMenu: false,
      selectedLanguage: 'en'
    };
  }

  componentDidMount() {
    let selectedLanguage = localStorage.getItem('lang');

    this.setState({
      changeLanguage: lang => {
        console.log(lang);
        localStorage.setItem('lang', lang);
        window.location.reload();
      },
      selectedLanguage: selectedLanguage ? selectedLanguage : 'en'
    });
  }

  render() {
    if (!this.state.changeLanguage) return <div>loading...</div>;

    return (
      <header className="navbar">
        <div className="navbar-title">
          <h1>MoDos</h1>
        </div>
        <div className={`menu ${this.state.displayMenu ? '' : 'hidden'}`}>
          <button
            onClick={e =>
              this.setState({ displayMenu: !this.state.displayMenu })
            }
          >
            <i className="material-icons md-36">close</i>
          </button>

          {PAGE_LIST.map(page => (
            <Link href={page.link}>
              <a>{i18n('header', page.name, this.props.lang)}</a>
            </Link>
          ))}
        </div>

        <div className="language">
          <select
            className="languageList"
            onChange={e => this.state.changeLanguage(e.target.value)}
          >
            <option value="en" selected={this.state.selectedLanguage === 'en'}>
              en
            </option>
            <option value="fr" selected={this.state.selectedLanguage === 'fr'}>
              fr
            </option>
          </select>
        </div>

        <div className="navMenuIcon">
          <button
            onClick={e =>
              this.setState({ displayMenu: !this.state.displayMenu })
            }
          >
            <i className="material-icons md-36">menu</i>
          </button>
        </div>
      </header>
    );
  }
}

export { Header };
