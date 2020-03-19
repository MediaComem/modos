import Link from 'next/link';
import React from 'react';
import { i18n, Page } from '../libs';

const PAGE_LIST: Page[] = [
  new Page('homepage', '/'),
  new Page('about', '/about')
];

interface Props {
  lang;
}
interface State {}

class Footer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  i18n(value) {
    return i18n('footer', value, this.props.lang);
  }

  render() {
    return (
      <footer className="main-footer">
        <div className="general-info">
          <div className="links">
            {PAGE_LIST.map(page => (
              <Link href={page.link} key={page.name}>
                <a>{this.i18n(page.name)}</a>
              </Link>
            ))}
          </div>
          <div className="subscribe">
            <h2>{this.i18n('subscribe')}</h2>

            <div>
              <h3>{this.i18n('join-newsletter')}</h3>
              <form>
                <input className="input" />
                <input type="submit" className="button"/>
              </form>
              <h3>{this.i18n('follow-us')}</h3>
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="partners">
          <h2>{this.i18n('parnters')}</h2>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="footer-end">
          <div>© 2020 MEI</div>
          <div>
            {this.i18n('back-to-top')}
            <button className="back-to-top">
              <i className="material-icons">arrow_drop_up</i>
            </button>
          </div>
        </div>
      </footer>
    );
  }
}

export { Footer };
