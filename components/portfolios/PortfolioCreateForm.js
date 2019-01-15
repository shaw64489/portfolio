// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert } from 'reactstrap';
import PortInput from '../form/PortInput';
import PortDate from '../form/PortDate';

const validateInputs = values => {
  let errors = {};

  //get array of input values
  //values - object of input values
  const keyArray = Object.entries(values);

  //iterate over form input keys
  //destructurize array - key/value
  keyArray.forEach(([key, value]) => {
    if (!values[key] && key !== 'endDate') {
      errors[key] = `Field ${key} is required!`;
    }
  });

  const startDate = values.startDate;
  const endDate = values.endDate;

  if (startDate && endDate && endDate.isBefore(startDate)) {
    errors.endDate = 'End Date cannot be before Start Date!';
  }

  return errors;
};

const INITIAL_VALUES = {
  title: '',
  company: '',
  location: '',
  position: '',
  description: '',
  startDate: '',
  endDate: ''
};

const PortfolioCreateForm = props => (
  <div>
    <Formik
      initialValues={INITIAL_VALUES}
      validate={validateInputs}
      onSubmit={props.onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field label="Title" type="text" name="title" component={PortInput} />

          <Field
            label="Company"
            type="text"
            name="company"
            component={PortInput}
          />

          <Field
            label="Location"
            type="text"
            name="location"
            component={PortInput}
          />

          <Field
            label="Position"
            type="text"
            name="position"
            component={PortInput}
          />

          <Field
            label="Description"
            type="textarea"
            name="description"
            component="textarea"
            component={PortInput}
          />

          <Field label="Start Date" name="startDate" component={PortDate} />

          <Field
            label="End Date"
            name="endDate"
            canBeDisabled={true}
            component={PortDate}
          />
          {props.error && (
            <Alert color="danger">{props.error}</Alert>
          )}

          <Button
            color="success"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioCreateForm;
