import React, {useState} from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";
import Clock from 'react-live-clock';
import PassengerPage from './PassengerPage/PassengerPage';
import { apiBaseUrl } from "./constants";
import { useStateValue, setPassengerList } from "./state";
import { Passenger } from "./types";
import { Formik, Field, Form } from "formik";
import { TextField, SelectField } from "./AddPassengerModal/FormField";

import PassengerListPage from "./PassengerListPage";

const App = () => {

  const [flightDetails, setFlightDetails] = useState(false);
  const [flightInfo, setFlightInfo] = useState({origin: "", destination: "", flightNumber: "", aircraftType: ""});
  
  const [, dispatch] = useStateValue();
  React.useEffect(() => {

    const fetchPassengerList = async () => {
      try {
        const { data: passengerListFromApi } = await axios.get<Passenger[]>(
          `${apiBaseUrl}/passengers`
        );
        dispatch(setPassengerList(passengerListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPassengerList();
  }, [dispatch]);

  const onSubmit = (values: { origin: string; destination: string; aircraftType: string; flightNumber: string}) => {
    setFlightDetails(true);
    const newValues = {
      origin: values.origin.toUpperCase(),
      destination: values.destination.toUpperCase(),
      flightNumber: values.flightNumber.substring(0,2).toUpperCase().concat(values.flightNumber.substring(2)),
      aircraftType: values.aircraftType
    };
    setFlightInfo(newValues);
    console.log(newValues);
  };

  const aircraftTypes = [{value: "", label:""},{value:"Boeing 777", label: "Boeing 777"}, 
      {value: "Boeing 787", label: "Boeing 787"}, {value: "Airbus 350", label: "Airbus 350"}];

  if (flightDetails) {
    return (
      <div className="App">
        <Router>
          <Container>
            <Header as="h1">Broadwing Airlines</Header>
            <div style={{display: 'flex'}}>
              <h2>{flightInfo.flightNumber}</h2>
              <p style={{marginLeft: '5px', marginTop: '8px'}}>{flightInfo.origin}-{flightInfo.destination}</p>
            </div>
            <Button as={Link} to="/" primary>
              Home
            </Button>
            <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Singapore'} />
            <Divider hidden />
            <Switch>
              <Route path='/passengers/:id'>
                <PassengerPage />
              </Route>
              <Route path="/">
                <PassengerListPage />
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
      const lengthError = 'IATA Airport code must be exactly 3 characters long';
      const flightNumLengthError = "Flight number must be 5 or 6 digits long";
      const errors: { [field: string]: string} = {};
      if (!values.origin) {
        errors.origin = requiredError;
      }
      if (!values.destination) {
        errors.destination = requiredError;
      }
      if (!values.aircraftType) {
        errors.aircraftType = requiredError;
      }
      if (values.origin.length !== 3) {
        errors.origin = lengthError;
      }
      if (values.destination.length !== 3) {
        errors.destination = lengthError;
      }
      if (values.flightNumber.length > 6 || values.flightNumber.length < 5) {
        errors.flightNumber = flightNumLengthError;
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