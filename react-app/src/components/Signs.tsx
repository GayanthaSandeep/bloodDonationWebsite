import React from 'react';

interface Props {
  children1: any;
  children2: any;
  children3: any;
  handleOperatorClick: (operator: string) => void;
}

const Signs = ({ children1, children2, children3, handleOperatorClick }: Props) => {
  return (
    <div className="btn-group btn-group-lg" role="group" aria-label="Large button group">
      <button type="button" className="btn btn-outline-primary" onClick={() => handleOperatorClick(children1)}>
        {children1}
      </button>
      <button type="button" className="btn btn-outline-primary" onClick={() => handleOperatorClick(children2)}>
        {children2}
      </button>
      <button type="button" className="btn btn-outline-primary" onClick={() => handleOperatorClick(children3)}>
        {children3}
      </button>
    </div>
  );
};

export default Signs;
