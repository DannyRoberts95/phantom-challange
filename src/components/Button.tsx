import React from 'react';
import styles from './Button.module.css';

const Button = (props) => {
  return <button className={styles.root} {...props} />;
};

export default Button;
