const TextArea = ({ id, name, label, placeholder }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={name} placeholder={placeholder}></textarea>
    </>
  );
};

export default TextArea;
