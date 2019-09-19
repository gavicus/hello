import React, { useState } from 'react';
import { arrayOf, func, string } from 'prop-types';

import NavButton from './NavButton';

const propTypes = {
  tabs: arrayOf(string),
  onChange: func.isRequired,
};

const Nav = ({tabs, onChange}) => {
  const [active, setActive] = useState(tabs[0]);

  const handleClick = event => {
    const title = event.target.innerHTML;
    onChange(title);
    setActive(title);
  };

  return (
    <div className="nav-wrapper">
    { tabs.map(tab => <NavButton key={tab} text={tab} activeTab={active} onClick={handleClick} />) }
    </div>
  );
};

Nav.propTypes = propTypes;

export default Nav;
