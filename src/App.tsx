import React, {useState} from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";
import Clock from 'react-live-clock';
import PatientPage from './PatientPage/PatientPage';
import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosisList } from "./state";
import { Patient, Diagnosis } from "./types";
import { Formik, Field, Form } from "formik";
import { TextField, SelectField } from "./AddPatientModal/FormField";

import PatientListPage from "./PatientListPage";

const App = () => {

  const [flightDetails, setFlightDetails] = useState(false);
  const [flightInfo, setFlightInfo] = useState({origin: "", destination: "", flightNumber: "", aircraftType: ""});
  
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnosisList();
  }, [dispatch]);

  const onSubmit = (values: { origin: string; destination: string; aircraftType: string; flightNumber: string}) => {
    setFlightDetails(true);
    setFlightInfo(values);
    console.log(values);
  };

  const aircraftTypes = [{value: "", label:""},{value:"Boeing 777", label: "Boeing 777"}, 
      {value: "Boeing 787", label: "Boeing 787"}, {value: "Airbus 350", label: "Airbus 350"}];

  if (flightDetails) {
    return (
      <div className="App">
        <Router>
          <Container>
            <Header as="h1">Broadwing Airlines</Header>
            <h2>{flightInfo.flightNumber}</h2>
            <p>{flightInfo.origin}-{flightInfo.destination}</p>
            <Button as={Link} to="/" primary>
              Home
            </Button>
            <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Singapore'} />
            <Divider hidden />
            <Switch>
              <Route path='/patients/:id'>
                <PatientPage />
              </Route>
              <Route path="/">
                <PatientListPage />
              </Route>
            </Switch>
          </Container>
        </Router>
    </div>

    );
  }

  return (
    
    <Formik initialValues={{
      origin: '',
      destination: '',
      aircraftType: '',
      flightNumber: ''
    }}
    onSubmit={(values) => onSubmit(values)}
    validate={(values) => {
      const requiredError = 'Field is required';
      const errors: { [field: string]: string} = {};
      if (!values.origin) {
        errors.origin = requiredError;
      }
      if (!values.destination) {
        errors.origin = requiredError;
      }
      if (!values.aircraftType) {
        errors.origin = requiredError;
      }
      return errors;
    }}
    >
      {() => {
        return (
          <div style={flightStyles}>
            <Header as="h1">Broadwing Airlines</Header>
            <Form>
              <Field
                label="Origin"
                placeholder="3 letter IATA airport code"
                name="origin"
                component={TextField}
                />
              <Field
                label="Destination"
                placeholder="3 letter IATA airport code"
                name="destination"
                component={TextField}
              />
              <Field
                label="Flight Number"
                placeholder="Flight Number"
                name="flightNumber"
                component={TextField}
              />
              <SelectField 
                label="Aircraft type" name="aircraftType" options={aircraftTypes} />
              <Button type="submit" color="green">
                Continue
              </Button>
            </Form>

          </div>
        );
      }}
    
    </Formik>


  );
};

export default App;


const flightStyles = {
  marginTop: "20%",
  marginLeft: "45%",
};