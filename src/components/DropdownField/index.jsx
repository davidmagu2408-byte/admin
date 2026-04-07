import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const DropdownField = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "None",
  displayKey = "name",
  valueKey = "_id",
  className = "w-100",
}) => {
  return (
    <div className="form-group">
      <h6>{label}</h6>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value ?? "")}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        className={className}
      >
        <MenuItem value="">{placeholder}</MenuItem>
        {options &&
          options.length !== 0 &&
          options.map((item) => (
            <MenuItem key={item[valueKey]} value={item[valueKey]}>
              {typeof displayKey === "function"
                ? displayKey(item)
                : item[displayKey]}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
};

export default DropdownField;
