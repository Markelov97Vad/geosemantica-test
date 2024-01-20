import { ChangeEvent } from 'react';
import './Input.scss';

interface IInput {
  name: string;
  value: string | undefined;
  placeholder: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ name, value, handleChange, placeholder } : IInput) {

  return (
    <>
      <input value={value} name={name} onChange={handleChange} className='input' type="search" minLength={3} maxLength={50} placeholder={placeholder}/>
    </>
  );
}

export default Input;