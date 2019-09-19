import React from 'react';
import classnames from 'classnames';

const NavButton = ({text, onClick, activeTab}) => {
  const classes = classnames({
    'nav-button': true,
    active: activeTab === text
  });
  return (
      <button
        onClick={onClick}
        className={classes}
      >
      {text}
      </button>
  );
};

export default NavButton;
