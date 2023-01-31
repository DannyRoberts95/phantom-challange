import React from 'react';
import styles from './Chip.module.css';

type PropTypes = {
  label: string;
  selected: boolean;
  viewOnly: boolean;
  onClick?: () => void | null;
};

const Chip = (props: PropTypes) => {
  const { label, selected, viewOnly, ...others } = props;
  return (
    <div
      className={styles.root}
      style={{
        opacity: selected ? 1 : 0.66,
        cursor: viewOnly ? `auto` : `pointer`,
      }}
      {...others}
    >
      #{label}
    </div>
  );
};

export default Chip;
