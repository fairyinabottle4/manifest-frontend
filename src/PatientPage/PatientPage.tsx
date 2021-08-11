import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Header,
  Segment,
  Divider,
  Card,
} from 'semantic-ui-react';

import { Patient, Diagnosis, BaseEntry } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, setDiagnosisList } from '../state';

const PatientData: React.FC = () => {
  const [{ patients, diagnosis }, dispatch] = useStateValue();
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


  const getDiagnosisDescription = (code: string): string => {
    return diagnosis[code]?.name;
  };

  const getEntryView = (entry: BaseEntry, lastEntry: boolean) => {
    return (
      <div>
        <Header as="h4">{entry.date}</Header>
        <p>{entry.description}</p>
        <Header as="h3">{entry.route}</Header>
        {entry.diagnosisCodes && (
          <>
            <Header as="h4">Diagnoses</Header>
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {getDiagnosisDescription(code)}
                </li>
              ))}
            </ul>
          </>
        )}
        {!lastEntry && <Divider section />}
      </div>
    );
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
              {/* <Icon name={genderIcon(patient.gender)} /> */}
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
