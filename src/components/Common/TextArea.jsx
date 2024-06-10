const TextArea = ({ id, name, label, placeholder, onChange, value }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      ></textarea>
    </>
  );
};

export default TextArea;
