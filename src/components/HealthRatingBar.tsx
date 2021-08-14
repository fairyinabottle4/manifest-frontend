import React from 'react';
import { Rating } from 'semantic-ui-react';

type BarProps = {
  rating: number;
};

const AirlineRatingBar = ({ rating }: BarProps) => {
  return (
    <div className="health-bar">
      {<Rating icon="star" disabled rating={rating} maxRating={5} />}
    </div>
  );
};

export default AirlineRatingBar;
