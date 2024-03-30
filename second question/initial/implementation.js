const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

// Configure window size
const windowSize = 10;

// Store numbers with unique IDs
let numbers = [];

const getAverage = (numbers) => {
  """Calculates the average of a list of numbers"""
  if (numbers.length > 0) {
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  } else {
    return null;
  }
};

app.get('/numbers/:numberId', async (req, res) => {
  const { numberId } = req.params;

  try {
    // Fetch number from third-party server with timeout
    const timeout = 500; // milliseconds
    const source = axios.CancelToken.source();
    const timeoutId = setTimeout(() => source.cancel('API call timed out'), timeout);

    const response = await axios.get(`http://localhost:9876/numbers/${numberId}`, { cancelToken: source.token });

    clearTimeout(timeoutId);

    if (response.status === 200) {
      const number = response.data.number;
      if (number && !numbers.includes(number)) {
        numbers.push(number);
      }

      // Limit number of stored numbers
      numbers = numbers.slice(-windowSize);

      res.json({
        windowPrevState: numbers.slice(0, -1),
        windowCurrState: numbers,
        numbers: number,  // Response from 3rd party server
        avg: getAverage(numbers),
      });
    } else {
      res.status(response.status).json({ error: 'Failed to fetch number' });
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error('API call timed out');
      res.status(500).json({ error: 'API call timed out' });
    } else {
      console.error('Error fetching number:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

