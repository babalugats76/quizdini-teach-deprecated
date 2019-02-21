import React from 'react';
import classNames from 'classnames';

const Icon = ({ name, icon, ...props }) => {

  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
    }
  };

  const iconClass = classNames('icon', `icon-${name}`);

  return (
    <svg
      style={styles.svg}
      className={iconClass}
      viewBox="0 0 32 32"
    >
      <path d={icon}></path>
    </svg>
  );
}

export default Icon;