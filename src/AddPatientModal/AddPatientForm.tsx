import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import {
  TextField,
  SelectField,
  TypeOption,
  DiagnosisSelection,
} from './FormField';
import {
  Patient,
  EntryType,
  HealthCheckRating,
  EntryForm,
  travelClass
} from '../types';
import { useStateValue } from '../state';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
export type EntryFormValues = EntryForm;

interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

interface EntryProps {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  patientId: string;
}

const firstClassRowOptions : TypeOption[] = [ { value: '1', label: '1' } ];
const firstClassRowLetters: TypeOption[] = [ { value: "A", label: "A"}, {value: "C", label: "C"}, {value: "D", label:"D"}, {value: "F", label: "F"}];
//generate all the numbers as key/value pairs that contain a value and a label
const bizClassRowOptions : TypeOption[] = [];
const bizClassRowLetters: TypeOption[] = [ { value: "A", label: "A"}, {value: "D", label: "D"}, {value: "F", label:"F"}, {value: "K", label: "K"}];
//eventually replace numbers based on aircraft type. Alternatively, all this can be stored in a separate file based on
//aircraft type
for (let i = 11; i < 24; i++) {
  if (i === 13) continue;
  bizClassRowOptions.push({ value: i.toString(), label: i.toString()});
}
const premiumEconRowOptions: TypeOption[] = [];
console.log(bizClassRowOptions);

for (let i = 31; i < 34; i++) {
  premiumEconRowOptions.push({ value: i.toString(), label: i.toString()});
}
const premiumEconRowLetters: TypeOption[] = [ { value: "A", label: "A"}, {value: "C", label: "C"}, {value: "D", label:"D"}, {value: "E", label: "E"}, {value: "F", label: "F"}, {value:"G", label:"G"},
                                              {value:"H", label:"H"}, {value:"K", label:"K"}];

const econRowOptions: TypeOption[] = [];

for (let i = 41; i < 62; i++) {
  econRowOptions.push({ value: i.toString(), label: i.toString()});
}

const econRowLetters: TypeOption[] = [{ value: "A", label: "A"}, { value: "B", label: "B"}, { value: "C", label: "C"}, {value: "D", label: "D"}, {value: "E", label:"E"},
                                      {value: "G", label: "G"}, {value: "H", label: "H"}, {value: "J", label: "J"}, {value: "K", label: "K"}];

const dietaryRequirements: TypeOption[] = [{value:"", label:""},{value: "BBML", label: "BBML"}, {value: "CHML", label:"CHML"}, {value:"HNML", label:"KSML"}, {value:"KSRFM", label:"KSRFM"}, {value:"MOML", label:"MOML"},
                                      {value:"AVML", label:"AVML"}, {value:"VJML", label:"VJML"}, {value:"VOML",label:"VGML"},{value:"VLML",label:"VLML"}, {value:"BLML",label:"BLML"}, 
                                      {value:"DBML", label:"DBML"}, {value:"FPML", label:"FPML"}, {value:"GFML", label:"GFML"}, {value:"LFML", label:"LFML"}, {value:"NLML", label:"NLML"}, 
                                      {value:"LSML", label:"LSML"}, {value:"MAMLA", "label": "MAMLA"}, {value:"NFMLA", label:"NFMLA"}, {value: "NSFML", label:"NSFML"}, {value:"SFML", label:"SFML"}];

const classOptions: TypeOption[] = [
  { value: travelClass.First, label: 'First' },
  { value: travelClass.Business, label: 'Business' },
  { value: travelClass.PremiumEconomy, label: 'PremiumEconomy' },
  { value: travelClass.Economy, label: 'Economy'}
];

const ratingOptions: TypeOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
  { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
  { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' },
];

const typeOptions: TypeOption[] = [
  { value: EntryType.HealthCheck, label: EntryType.HealthCheck },
  { value: EntryType.Hospital, label: EntryType.Hospital },
  {
    value: EntryType.OccupationalHealthcare,
    label: EntryType.OccupationalHealthcare,
  },
];

const isValidDate = (dateString: string): boolean => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  return dateString.match(regEx) != null;
};

const showConditionalFields = (type: string) => {
  switch (type) {
    case 'HealthCheck':
      return (
        <SelectField
          label="Rating"
          name="healthCheckRating"
          options={ratingOptions}
        />
      );

    case 'Hospital':
      return (
        <>
          <Field
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="dischargeDate"
            component={TextField}
          />
          <Field
            label="Criteria"
            name="dischargeCriteria"
            component={TextField}
          />
        </>
      );

    case 'OccupationalHealthcare':
      return (
        <>
          <Field
            label="EmployerName"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick Leave Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeaveStartDate"
            component={TextField}
          />
          <Field
            label="Sick Leave End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeaveEndDate"
            component={TextField}
          />
        </>
      );

    default:
      return null;
  }
};

export const AddEntryForm: React.FC<EntryProps> = ({
  onSubmit,
  onCancel,
  patientId,
}) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        id: patientId,
        description: '',
        specialist: '',
        type: 'HealthCheck',
        date: '',
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.LowRisk,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isValidDate(values.date)) {
          errors.date = 'Date format: YYYY-MM-DD';
        }
        if ('Hospital' === values.type) {
          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          }
          if (values.dischargeDate && !isValidDate(values.dischargeDate)) {
            errors.dischargeDate = 'Date format: YYYY-MM-DD';
          }
        }
        if ('OccupationalHealthcare' === values.type) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (
            values.sickLeaveStartDate &&
            !isValidDate(values.sickLeaveStartDate)
          ) {
            errors.sickLeaveStartDate = 'Date format: YYYY-MM-DD';
          }
          if (
            values.sickLeaveEndDate &&
            !isValidDate(values.sickLeaveEndDate)
          ) {
            errors.sickLeaveEndDate = 'Date format: YYYY-MM-DD';
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field type="hidden" name="id" />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <SelectField label="Types" name="type" options={typeOptions} />
            {showConditionalFields(values.type)}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export const AddPatientForm: React.FC<Props> = ({ onSubmit, onCancel }) => {  
  return (
    <Formik
      initialValues={{
        travelClass: travelClass.Economy,
        dietaryRequirements: '',
        rowNumber: '41',
        rowLetter: 'A',
        name: '',
        //should do validation check to ensure that the ssn is kept within 6 alphanumeric characters
        ssn: '',
        dateOfBirth: '',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.name) {
          errors.name = requiredError;
        }
        if (!values.ssn) {
          errors.ssn = requiredError;
        }
        if (!values.dateOfBirth) {
          errors.dateOfBirth = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Name"
              placeholder="Name"
              name="name"
              component={TextField}
            />
            <Field
              label="Confirmation Number"
              placeholder="SSN"
              name="ssn"
              component={TextField}
            />
            <Field
              label="Date Of Birth"
              placeholder="YYYY-MM-DD"
              name="dateOfBirth"
              component={TextField}
            />
            <SelectField label="Class"  name="travelClass" options={classOptions} />
            <SelectField label="Row Number" name="rowNumber" options={values.travelClass === "economy" ? econRowOptions 
                                            : values.travelClass === "premium economy" ? premiumEconRowOptions
                                            : values.travelClass === "business" ? bizClassRowOptions
                                            : firstClassRowOptions} />
            <SelectField label="Row Letter" name="rowLetter" options={values.travelClass === "economy" ? econRowLetters 
                                : values.travelClass === "premium economy" ? premiumEconRowLetters
                                : values.travelClass === "business" ? bizClassRowLetters
                                : firstClassRowLetters} />
            <SelectField label="Dietary Requirements" name="dietaryRequirements" options={dietaryRequirements} />
            {/* <Field label="dietary requirement" placeholder="dietary requirements" name="dietaryRequirements" component={TextField} /> */}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientForm;
