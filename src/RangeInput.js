import React from 'react';

import Label from './Label';

const RangeInput = ({id, label, min, max, step, value, onChange, ...props}) => {

  return (
    <div className="form-group">
      <Label htmlFor={id}>{label}</Label>
      <input 
        id={id}
        list={id + "-list"}
        type="range" 
        min={min} 
        max={max} 
        step={step}
        value={value}
        onChange={onChange} 
        className="form-control-range"
        {...props} />
      <datalist id={id + '-list'}>
        {Array.from({length: Math.floor(((max - min) + 1) / step)}, (v, k) => min + (k * step)).map((v,i) => <option id={v} key={v} value={v} label={v} />)}
      </datalist>
      <output htmlFor={id + "-output"}>{value}</output>
    </div>
  )
  ;
}

export default RangeInput;