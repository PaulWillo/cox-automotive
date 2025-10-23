import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import FinanceCalculator from '../FinanceCalculator';

const VehicleDetails = () => {
  const { id } = useParams();
  const vehicle = useSelector((state) =>
    state.vehicles.items.find((v) => v.id === id)
  );

  if (!vehicle) {
    return (
      <Box p={4}>
        <Typography variant="h6">Vehicle not found.</Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
          Back
        </Button>
      </Box>
    );
  }

  return (
        <Box p={4}>
      <Typography variant="h4" gutterBottom>
        {vehicle.year} {vehicle.make} {vehicle.model}
      </Typography>
      <Typography>Price: ${vehicle.price.toLocaleString()}</Typography>
      <Typography>Mileage: {vehicle.mileage.toLocaleString()} km</Typography>
      <Typography>Colour: {vehicle.colour}</Typography>

      {/* Finance Calculator */}
      <FinanceCalculator price={vehicle.price} />

      <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>
        Back to list
      </Button>
    </Box>
  );
};

export default VehicleDetails;
