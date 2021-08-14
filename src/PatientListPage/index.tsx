import React from "react";
import axios from "axios";
import { Container, Table, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";

const PatientListPage = () => {
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    console.log(values);
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/passengers`,
        values
      );
      dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Passenger Manifest</h3>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Seat Number</Table.HeaderCell>
            <Table.HeaderCell>Travel Class</Table.HeaderCell>
            <Table.HeaderCell>Dietary Requirements</Table.HeaderCell>
            <Table.HeaderCell>Airline Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(patients).map((patient: Patient) => (
            <Table.Row key={patient.id}>
              <Table.Cell> <Link to={`/patients/${patient.id}`}>{patient.name}</Link> </Table.Cell>
              <Table.Cell>{patient.seatNumber}</Table.Cell>
              <Table.Cell>{patient.travelClass}</Table.Cell>
              <Table.Cell>{patient.dietaryRequirements}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar rating={patient.rating!}/>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Passenger</Button>
    </div>
  );
};

export default PatientListPage;
