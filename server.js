const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { classifyNumber, getNumberProperties } = require('./utils/numberUtils');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/api/classify-number', async (req, res) => {
  try {
    const numberParam = req.query.number ?? 0;

    const number =  parseInt(numberParam, 10);
    const absNum = Math.abs(number);
    
    if (isNaN(number)) {
      return res.status(400).json({
        number: numberParam,
        error: true
      });
    }

    const [properties, digitSum] = getNumberProperties(number);
    const funFact = await getMathFact(absNum);
    
    res.json({
      number,
      is_prime: classifyNumber.isPrime(number),
      is_perfect: classifyNumber.isPerfect(number),
      properties,
      digit_sum: digitSum,
      fun_fact: funFact
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
});

app.get('/', (_, res) => res.redirect('/api/classify-number?number=0'));

async function getMathFact(number) {
  try {
    const response = await axios.get(`http://numbersapi.com/${number}/math`);
    return response.data;
  } catch (error) {
    return `${number} is an interesting number`; // Fallback fact
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
