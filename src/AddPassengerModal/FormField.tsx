import React from 'react';
import { ErrorMessage, Field, FieldProps } from 'formik';
import { Form } from 'semantic-ui-react';
import { travelClass } from '../types';

// structure of a single option
export type TypeOption = {
  value: travelClass | number | string;
  label: string | number;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: TypeOption[];
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

