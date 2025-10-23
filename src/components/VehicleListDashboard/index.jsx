import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVehicles } from '../../features/vehicles/vehiclesSlice';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const VehicleList = () => {
  const dispatch = useDispatch();
  const { items: vehicles, status } = useSelector((state) => state.vehicles);
  const [sortField, setSortField] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchVehicles());
    }
  }, [status, dispatch]);

  const sortedVehicles = [...vehicles].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortOrder === 'asc' ? valA - valB : valB - valA;
  });

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Vehicle Dashboard
      </Typography>
      <Box display="flex" gap={2} mb={3}>
        <FormControl>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortField}
            label="Sort By"
            onChange={(e) => setSortField(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="year">Year</MenuItem>
            <MenuItem value="mileage">Mileage</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Order</InputLabel>
          <Select
            value={sortOrder}
            label="Order"
            onChange={(e) => setSortOrder(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2}>
        {sortedVehicles.map((v) => (
          <Grid item xs={12} sm={6} md={4} key={v.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  {v.year} {v.make} {v.model}
                </Typography>
                <Typography color="text.secondary">
                  Price: ${v.price.toLocaleString()}
                </Typography>
                <Typography color="text.secondary">
                  Mileage: {v.mileage.toLocaleString()} km
                </Typography>
                <Typography color="text.secondary">
                  Colour: {v.colour}
                </Typography>
                <Box mt={2}>
                  <Button
                    component={Link}
                    to={`/vehicles/${v.id}`}
                    variant="contained"
                    fullWidth
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VehicleList;
