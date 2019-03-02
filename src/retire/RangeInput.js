import React from 'react';

import Label from './Label';
import InputFeedback from '../InputFeedback';

const RangeInput = ({id, label, min, max, step, error, value, onChange, ...props}) => {

  return (
    <div className="form-group">
      <Label htmlFor={id}>{label}</Label>
      <input 
        id={id}
        list={`${id}-list`}
        type="range" 
        min={min} 
        max={max} 
        step={step}
        value={value}
        onChange={onChange} 
        className="ui slider range"
        {...props} />
      <datalist id={`${id}-list`}>
        {Array.from({length: Math.floor(((max - min) + 1) / step)}, (v, k) => min + (k * step)).map((v,i) => <option id={v} key={v} value={v} label={v} />)}
      </datalist>
      <output htmlFor={`${id}-output`}>{value}</output>
      <InputFeedback error={error} />
    </div>
  )
  ;
}

export default RangeInput;