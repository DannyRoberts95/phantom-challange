import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import classes from './Header.module.css';

const Header = () => {
  return (
    <div className={classes.root}>
      <div className={classes.contents}>
        <Link href="/">
          <Image
            src={`/phantom.png`}
            width={28}
            height={45}
            alt="A spooky ghost"
          />
        </Link>

        <nav className={classes.links}>
          <Link href="/">Links</Link>
          <Link href="/analytics">Analytics</Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
