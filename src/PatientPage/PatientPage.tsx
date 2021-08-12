import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Header,
  Segment,
  Divider,
  Card,
  Icon
} from 'semantic-ui-react';

import { Patient, Diagnosis, BaseEntry, FrequentFlyer} from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, setDiagnosisList } from '../state';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

const PatientData: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientData);
        dispatch({ type: 'ADD_PATIENT', payload: patientData });
      } catch (error) {
        console.log(error);
      }
    };

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

    if (patients[id] && patients[id].confirmNumber) {
      setPatient(patients[id]);
    } else {
      void fetchPatient();
      void fetchDiagnosisList();
    }
  }, [id]);

  const getEntryView = (entry: BaseEntry, lastEntry: boolean) => {
    return (
      <div>
        <Header as="h4">{entry.date}</Header>
        <p>{entry.travelClass}</p>
        <Header as="h3">{entry.route}</Header>
        {!lastEntry && <Divider section />}
      </div>
    );
  };

  const freqFlyerIcon = (status: FrequentFlyer | undefined): SemanticICONS => {
    switch (status) {
      case 'silver':
        return 'chess knight';
      case 'gold':
        return 'chess rook';
      case 'platinum':
        return 'chess king';
      default:
        return 'square full';    
    }
  };


  //entries is optional hence the question mark
  const totalEntries = patient?.entries?.length ?? 0;

  return (
    <>
      {patient && (
        <section>
          <Card>
            <Card.Content header={patient.name} />
            <Card.Content extra>
              <Icon name={freqFlyerIcon(patient.frequentFlyer)} />
              {patient.confirmNumber}
            </Card.Content>
          </Card>
          {totalEntries > 0 && (
            <>
              <h2>Recent Flights</h2>
              <Segment>
                {patient.entries.map((entry, index) =>
                  getEntryView(entry, index + 1 === totalEntries)
                )}
              </Segment>
            </>
          )}
        </section>
      )}
    </>
  );
};

export default PatientData;
