const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  ...rest
}) => {
  return (
    <div className="form-group">
      <h6>{label}</h6>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
