import './Input.scss';

function Input() {

  return (
    <>
      <input className='input' type="search" minLength={3} maxLength={50}/>
    </>
  );
}

export default Input;