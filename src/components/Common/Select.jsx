const Select = ({ label, item, id, name, value, options, onChange, size }) => {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} name={name} onChange={onChange} value={value} size={size}>
        <option value={0}>{item}</option>
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
