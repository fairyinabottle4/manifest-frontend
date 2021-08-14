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

import { Passenger, BaseEntry, FrequentFlyer} from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

const PassengerData: React.FC = () => {
  const [{ passengers }, dispatch] = useStateValue();
  const [flyer, setPassenger] = useState<Passenger | undefined>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPassenger = async () => {
      try {
        const { data: passengerData } = await axios.get<Passenger>(
          `${apiBaseUrl}/passengers/${id}`
        );
        setPassenger(passengerData);
        dispatch({ type: 'ADD_PASSENGER', payload: passengerData });
      } catch (error) {
        console.log(error);
      }
    };

    if (passengers[id] && passengers[id].confirmNumber) {
      setPassenger(passengers[id]);
    } else {
      void fetchPassenger();
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
  const totalEntries = flyer?.entries?.length ?? 0;

  return (
    <>
      {flyer && (
        <section>
          <Card>
            <Card.Content header={flyer.name} />
            <Card.Content extra>
              <Icon name={freqFlyerIcon(flyer.frequentFlyer)} />
              {flyer.confirmNumber}
            </Card.Content>
          </Card>
          {totalEntries > 0 && (
            <>
              <h2>Recent Flights</h2>
              <Segment>
                {flyer.entries.map((entry, index) =>
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

export default PassengerData;
