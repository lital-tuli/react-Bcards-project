import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';

const FormField = ({ name, label, type = "text", required = false, formik, col }) => {
  const { theme } = useTheme();
  
  // Get the top-level field name (e.g., 'name' from 'name.first')
  const [topField] = name.split('.');
  
  // Get the nested error if it exists
  const error = formik.errors[topField]?.[name.split('.')[1]] || formik.errors[topField];
  
  // Get the touched state
  const touched = formik.touched[topField];

  return (
    <div className={`col-md-${col}`}>
      <div className="form-floating">
        <input
          type={type}
          className={`form-control ${theme.inputBg} ${touched && error ? 'is-invalid' : ''}`}
          id={name}
          {...formik.getFieldProps(name)}
          placeholder={label}
        />
        <label htmlFor={name} className={theme.textColor}>
          {label} {required && '*'}
        </label>
        {touched && error && (
          <div className="invalid-feedback">
            {error && typeof error === 'object' ? error[name.split('.')[1]] : error}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormField;