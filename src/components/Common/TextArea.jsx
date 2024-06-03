const TextArea = ({ id, name, label }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={name}></textarea>
    </>
  );
};

export default TextArea;
