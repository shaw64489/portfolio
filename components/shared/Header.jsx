import React, { Component, Fragment } from 'react';
import Link from 'next/link';

import '../../styles/main.scss';

class Header extends Component {
  render() {

    const title = this.props.title;

    return (
      <Fragment>
        <p>{title}</p>
        {this.props.children}
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/portfolios">
          <a>Portfolio</a>
        </Link>
        <Link href="/blogs">
          <a>Blog</a>
        </Link>
        <Link href="/cv">
          <a>CV</a>
        </Link>
      </Fragment>
    );
  }
}

export default Header;
