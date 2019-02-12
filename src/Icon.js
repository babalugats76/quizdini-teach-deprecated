import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// eslint-disable-next-line
import { faUnderline, faCode, faSuperscript, faSubscript } from '@fortawesome/free-solid-svg-icons'

const Icon = (props) => {

  const { type } = props;
  let icon = undefined;

  switch (type) {
    case 'underline':
      icon = faUnderline;
      break;
    case 'code':
      icon = faCode; 
      break;
    case 'superscript':
      icon = faSuperscript;
      break;
    case 'subscript':
      icon = faSubscript;
      break;
    default:
      break;
  }

  return icon && (<FontAwesomeIcon 
                    icon={icon} 
                    className="icon"
                    fixedWidth
                    {...props} />);

}

export default Icon;