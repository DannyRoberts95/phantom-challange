import React from 'react';
import styles from './Button.module.css';

type PropTypes = {
  variant?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
