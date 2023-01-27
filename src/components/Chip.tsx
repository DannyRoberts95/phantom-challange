import React from 'react';

type PropTypes = {
  label: string;
  color?: string;
  size?: string;
  selected: boolean;
};

const Chip = (props: PropTypes) => {
  const { label, color, selected, size = `small`, ...others } = props;
  return (
    <div style={{ color: selected ? `red` : `inherit` }} {...others}>
      {label}
    </div>
  );
};

export default Chip;
