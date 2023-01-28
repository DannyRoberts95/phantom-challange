import React from 'react';
import styles from './Button.module.css';

type PropTypes = {
  variant: string;
};

const Button = (props: PropTypes) => {
  return <button className={styles.root} {...props} />;
};

export default Button;
