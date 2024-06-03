const Input = ({ label, type, id, name, placeholder }) => {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} id={id} name={name} placeholder={placeholder} />
    </>
  );
};

export default Input;
