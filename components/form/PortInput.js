import { Button, FormGroup, Label, Input, Alert } from 'reactstrap';

const PortInput = ({
  label,
  type,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <FormGroup>
    <Label>{label}</Label>
    <Input type={type} {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <Alert color="danger">{errors[field.name]}</Alert>
      
    )}
  </FormGroup>
);

export default PortInput;
