import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddPassengerForm, {
  PassengerFormValues,
} from './AddPassengerForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PassengerFormValues) => void;
  error?: string;
}

const AddPassengerModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new passenger</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddPassengerForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddPassengerModal;
