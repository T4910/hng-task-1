const classifyNumber = {
  isPrime: (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  },

  isPerfect: (num) => {
    if (num <= 1) return false;
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        sum += i;
        if (i !== num / i) sum += num / i;
      }
    }
    return sum === num;
  }
};

const getNumberProperties = (num) => {
  const properties = [];
  let digitSum = 0;
  let temp = Math.abs(num);
  
  // Calculate digit sum
  while (temp > 0) {
    digitSum += temp % 10;
    temp = Math.floor(temp / 10);
  }
  
  // Check Armstrong number
  const digits = String(num).split('');
  const power = digits.length;
  const armstrongSum = digits.reduce((acc, digit) => 
    acc + Math.pow(parseInt(digit), power), 0);
  if (armstrongSum === num) properties.push('armstrong');

  // Check properties
  if (num % 2 === 0) properties.push('even');
  else properties.push('odd');

  console.log(properties)
  return [properties, digitSum];
};

module.exports = { classifyNumber, getNumberProperties };
