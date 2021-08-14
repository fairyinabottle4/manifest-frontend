import React from "react";
import axios from "axios";
import { Container, Table, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { PassengerFormValues } from "../AddPassengerModal/AddPassengerForm";
import AddPassengerModal from "../AddPassengerModal";
import { Passenger } from "../types";
import { apiBaseUrl } from "../constants";
import AirlineRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";

const PassengerListPage = () => {
  const [{ passengers }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPassenger = async (values: PassengerFormValues) => {
    console.log(values);
    try {
      const { data: newPassenger } = await axios.post<Passenger>(
        `${apiBaseUrl}/passengers`,
        values
      );
      dispatch({ type: "ADD_PATIENT", payload: newPassenger });
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
          {Object.values(passengers).map((passenger: Passenger) => (
            <Table.Row key={passenger.id}>
              <Table.Cell> <Link to={`/passengers/${passenger.id}`}>{passenger.name}</Link> </Table.Cell>
              <Table.Cell>{passenger.seatNumber}</Table.Cell>
              <Table.Cell>{passenger.travelClass}</Table.Cell>
              <Table.Cell>{passenger.dietaryRequirements}</Table.Cell>
              <Table.Cell>
                <AirlineRatingBar rating={passenger.rating!}/>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddPassengerModal
        modalOpen={modalOpen}
        onSubmit={submitNewPassenger}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Passenger</Button>
    </div>
  );
};

export default PassengerListPage;
