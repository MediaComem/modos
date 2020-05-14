import Link from 'next/link';
import React from 'react';
import Head from 'next/head';
import { i18n, PageLink } from '../../libs';

import styles from './Header.module.scss';

const PAGE_LIST: PageLink[] = [
  new PageLink('homepage', '/'),
  new PageLink('about', '/about'),
  new PageLink('contribute', '/contribute'),
  new PageLink('mapping-party', '/mapping-party'),
  new PageLink('contact', '/contact')
];

interface Props {
  lang;
}
interface State {
  changeLanguage;
  displayMenu;
  selectedLanguage;
  displayAnimMenu;
}

class Header extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      changeLanguage: undefined,
      displayMenu: false,
      selectedLanguage: 'fr',
      displayAnimMenu: true
    };
  }

  componentDidMount() {
    const selectedLanguage = localStorage.getItem('lang');

    this.setState({
      changeLanguage: lang => {
        localStorage.setItem('lang', lang);
        window.location.reload();
      },
      selectedLanguage: selectedLanguage ? selectedLanguage : 'fr'
    });
  }

  render() {
    if (!this.state.changeLanguage) {
      return <div>loading...</div>;
    }

    return (
      <>
        <Head>
          <title>MoDos</title>
          <link rel='icon' href='/favicon.ico' />

          <link
            href='https://fonts.googleapis.com/icon?family=Material+Icons'
            rel='stylesheet'
          ></link>
        </Head>

        <header className={styles.navbar}>
          <div className={styles.navMenuIcon}>
            <button
              onClick={() =>
                this.setState({ displayMenu: !this.state.displayMenu })
              }
            >
              <i className='material-icons md-36'>menu</i>
            </button>
          </div>

          <div className={styles.language}>
            <select
              className={styles.languageList}
              onChange={(e) => this.state.changeLanguage(e.target.value)}
              value={this.state.selectedLanguage}
            >
              <option value='fr'>Français</option>
              <option value='en'>English</option>
            </select>
          </div>

          <div
            className={`
            ${styles.menu} 
            ${this.state.displayAnimMenu ? styles.fade : ''} 
            ${this.state.displayMenu ? '' : 'hidden'}`}
            onAnimationEnd={() => this.setState({ displayAnimMenu: false })}
          >
            <button
              onClick={e =>
                this.setState({
                  displayMenu: !this.state.displayMenu,
                  displayAnimMenu: true
                })
              }
            >
              <i className='material-icons md-36'>close</i>
            </button>

            {PAGE_LIST.map(page =>
              <Link href={page.link} key={page.name}>
                <a
                  onClick={e =>
                    this.setState({
                      displayMenu: !this.state.displayMenu,
                      displayAnimMenu: false
                    })
                  }
                >
                  {i18n('header', page.name, this.props.lang)}
                </a>
              </Link>)}
          </div>
        </header>
      </>
    );
  }
}

export { Header };
