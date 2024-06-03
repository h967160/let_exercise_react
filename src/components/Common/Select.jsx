const Select = ({ label, id, name, options }) => {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} name={name}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
