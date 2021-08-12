import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import {
  TextField,
  SelectField,
  TypeOption,
} from './FormField';
import {
  Patient,
  travelClass
} from '../types';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
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

const dietaryRequirements: TypeOption[] = [{value:"", label:""},{value: "BBML", label: "BBML Baby Meal"}, {value: "CHML", label:"CHML Child Meal"}, {value:"HNML", label:"HNML Hindu Non-Vegetarian Meal"},
                                      {value:"KSML", label:"KSML Kosher Meal"}, {value:"KSRFM", label:"KSRFM Kosher Refreshment"}, {value:"MOML", label:"MOML Muslim Meal"},
                                      {value:"AVML", label:"AVML Vegetarian Indian Meal"}, {value:"VJML", label:"VJML Vegetarian Jain Meal"}, {value:"VOML",label:"VOML Vegetarian Oriental Meal"},
                                      {value:"VGML", label:"VGML Vegetarian Vegan Meal"}, {value:"VLML",label:"VLML Vegetarian Lacto-Ovo Meal"}, {value:"BLML",label:"BLML Bland Meal"}, 
                                      {value:"DBML", label:"DBML Diabetic Meal"}, {value:"FPML", label:"FPML Fruit Platter"}, {value:"GFML", label:"GFML Gluten Intolerant Meal"}, 
                                      {value:"LFML", label:"LFML Low Fat Meal"}, {value:"NLML", label:"NLML Low Lactose Meal"}, {value:"LSML", label:"LSML Low Salt Meal"}, 
                                      {value:"MAMLA", "label": "MAMLA Minimal Allergen Meal"}, {value:"NFMLA", label:"NFMLA Non-Strict Nut Free Meal"}, {value: "NSFML", label:"NSFML Non Seafood Meal"}, 
                                      {value:"SFML", label:"SFML Seafood Meal"}];

const classOptions: TypeOption[] = [
  { value: travelClass.First, label: 'First' },
  { value: travelClass.Business, label: 'Business' },
  { value: travelClass.PremiumEconomy, label: 'PremiumEconomy' },
  { value: travelClass.Economy, label: 'Economy'}
];


// const isValidDate = (dateString: string): boolean => {
//   const regEx = /^\d{4}-\d{2}-\d{2}$/;
//   // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
//   return dateString.match(regEx) != null;
// };



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
        confirmNumber: '',
        dateOfBirth: '',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.name) {
          errors.name = requiredError;
        }
        if (!values.confirmNumber) {
          errors.confirmNumber = requiredError;
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
              label="Booking Confirmation"
              placeholder="6-character alphanumeric"
              name="confirmNumber"
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
