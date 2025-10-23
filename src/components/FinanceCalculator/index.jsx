import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Divider,
} from '@mui/material';

const FinanceCalculator = ({ price }) => {
  // Default deposit = 10% of price
  const [deposit, setDeposit] = useState(price * 0.1);
  const [term, setTerm] = useState(60);

  const quote = useMemo(() => {
    const onTheRoadPrice = price;
    const totalDeposit = deposit;
    const totalAmountOfCredit = onTheRoadPrice - totalDeposit;
    const numberOfMonthlyPayments = term;
    const monthlyPayment =
      totalAmountOfCredit / numberOfMonthlyPayments;

    return {
      onTheRoadPrice,
      totalDeposit,
      totalAmountOfCredit,
      numberOfMonthlyPayments,
      monthlyPayment,
    };
  }, [price, deposit, term]);

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Finance Calculator
      </Typography>
      <Typography color="text.secondary" mb={2}>
        Adjust the deposit or term to see how your payments change.
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
        <TextField
          label="Vehicle Price ($)"
          value={price.toLocaleString()}
          InputProps={{ readOnly: true }}
          sx={{ minWidth: 200 }}
        />
        <TextField
          label="Deposit ($)"
          type="number"
          value={deposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
          sx={{ minWidth: 200 }}
        />
        <TextField
          label="Term (months)"
          type="number"
          value={term}
          onChange={(e) => setTerm(Number(e.target.value))}
          sx={{ minWidth: 200 }}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box display="flex" flexDirection="column" gap={1}>
        <Typography>
          <strong>Total Deposit:</strong> ${quote.totalDeposit.toFixed(2)}
        </Typography>
        <Typography>
          <strong>Total Amount of Credit:</strong> ${quote.totalAmountOfCredit.toFixed(2)}
        </Typography>
        <Typography>
          <strong>Number of Payments:</strong> {quote.numberOfMonthlyPayments}
        </Typography>
        <Typography variant="h6" mt={2}>
          Monthly Payment: ${quote.monthlyPayment.toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default FinanceCalculator;
