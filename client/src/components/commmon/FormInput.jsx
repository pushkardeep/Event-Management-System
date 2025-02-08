const FormInput = ({ label, type, placeholder, value, onChange, required = false, options = [] }) => {
    return (
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-white">{label}</label>
  
        {type === "textarea" ? (
          <textarea
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            rows="4"
          ></textarea>
        ) : type === "select" ? (
          <select
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
            value={value}
            onChange={onChange}
            required={required}
          >
            <option value="" disabled>Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
          />
        )}
      </div>
    );
  };
  
  export default FormInput;
  