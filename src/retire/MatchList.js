import React from 'react';

import Card from './Card';

const MatchList = ({ matches, ...props }) => {
  return (
    <div className="d-flex flex-row flex-wrap">
      {matches.map((match, idx) => (
        <Card key={idx} title={match.term || ''} text={match.definition || ''} />
      ))}
    </div>
  );
};

export default MatchList;