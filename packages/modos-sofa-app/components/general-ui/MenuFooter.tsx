import Link from 'next/link';
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { i18n } from '../../libs';
import { Button } from "react-bootstrap";
import styles from './menu_footer.module.scss';

class MenuFooter extends Component<{lang:String}, {}> {
    fi18n: (value: any) => any
    constructor(props) {
        super(props);
        this.fi18n = value => i18n('footer', value, props.lang)
    }
    render() {
        return (
            <div className={styles.footer}>
                <a href="https://modos.heig-vd.ch" target="_blank"><Button className={styles.btLink}>{this.fi18n('modos_project')}</Button></a>
            </div>
        );
    }
}
export default MenuFooter;
