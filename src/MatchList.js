import React from 'react';

import Card from './Card';

const MatchList = ({ matches, ...props }) => {
  return (
    <ul className="list-group list-group-flush">
       { matches.map((match, idx) => (
           <li className="list-group-item" key={idx}>
             <Card title={match.term || ''} text={match.definition || ''} />
           </li>
         )) }
    </ul>
  );
};

export default MatchList;