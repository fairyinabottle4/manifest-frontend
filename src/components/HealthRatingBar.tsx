import React from 'react';
import { Rating } from 'semantic-ui-react';

type BarProps = {
  rating: number;
  //firstTime: boolean
};

const HealthRatingBar = ({ rating }: BarProps) => {
  return (
    <div className="health-bar">
      {<Rating icon="star" disabled rating={rating} maxRating={5} />}
    </div>
  );
};

export default HealthRatingBar;
