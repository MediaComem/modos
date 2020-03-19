import Link from 'next/link';
import React from 'react';
import Head from 'next/head';
import { i18n, Page } from '../libs';

import styles from './Header.module.scss'

const PAGE_LIST: Page[] = [
  new Page('homepage', '/'),
  new Page('about', '/about'),
  new Page('mapping-party', '/mapping-party'),
  new Page('contribute', '/contribute'),
  new Page('contact', '/contact')
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
      <>
        <Head>
          <title>MoDos</title>
          <link rel="icon" href="/favicon.ico" />

          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossOrigin=""
          />
        </Head>

        <header className={styles['navbar']}>
          <div className={styles['navbar-title']}>
            <h1>MoDos</h1>
          </div>

          <div className={`${styles['menu']} ${this.state.displayMenu ? '' : 'hidden'}`}>
            <button
              onClick={e =>
                this.setState({ displayMenu: !this.state.displayMenu })
              }
            >
              <i className="material-icons md-36">close</i>
            </button>

            {PAGE_LIST.map(page => (
              <Link href={page.link} key={page.name}>
                <a>{i18n('header', page.name, this.props.lang)}</a>
              </Link>
            ))}
          </div>

          <div className={styles['language']}>
            <select
              className={styles['languageList']}
              onChange={e => this.state.changeLanguage(e.target.value)}
              value={this.state.selectedLanguage}
            >
              <option value="en">en</option>
              <option value="fr">fr</option>
            </select>
          </div>

          <div className={styles['navMenuIcon']}>
            <button
              onClick={e =>
                this.setState({ displayMenu: !this.state.displayMenu })
              }
            >
              <i className="material-icons md-36">menu</i>
            </button>
          </div>
        </header>
      </>
    );
  }
}

export { Header };
