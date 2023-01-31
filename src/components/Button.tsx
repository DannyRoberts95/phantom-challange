import React from 'react';
import styles from './Button.module.css';

type PropTypes = {
  variant?: string;
  children: React.ReactNode;
  onClick?: (
    e: React.MouseEventHandler<HTMLButtonElement>,
  ) => void | Promise<false | undefined>;
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
