import React from 'react';
import styles from './Button.module.css';

type PropTypes = {
  variant?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = (props: PropTypes) => {
  const { variant } = props;
  switch (variant) {
    case `primary`:
      return <button className={styles.primary} {...props} />;
    default:
      return <button className={styles.secondary} {...props} />;
  }
};

export default Button;
