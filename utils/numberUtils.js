const { isInteger, toNumber } = require("lodash");

const classifyNumber = {
  
  isInteger: (num) => {
    const _ = toNumber(num)
    return isInteger(_)
  },

  isPrime: (num) => {
    return new Promise((resolve, reject) => {
      if (num <= 1) resolve(false);
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) resolve(false);
      }
      
      resolve(true);
      reject(new Error('An error occured isPrime'));
    });
  },

  isPerfect: (num) => {
    return new Promise((resolve, reject) => {
      if (num <= 1) resolve(false);
      let sum = 1;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          sum += i;
          if (i !== num / i) sum += num / i;
        }
      }

      resolve(sum === num);
      reject(new Error('An error occured isPerfect'));
    })
  }
};

const getNumberProperties = (num) => {
  return new Promise((resolve, reject) => {
    console.log('getNumberProperties');

    const properties = [];
    let digitSum = 0;
    const absNum = Math.abs(num)
    let temp = Math.abs(num);
    
    // Calculate digit sum
    while (temp > 0) {
      digitSum += temp % 10;
      temp = Math.floor(temp / 10);
    }
    
    // Check Armstrong number
    const digits = String(absNum).split('');
    const power = digits.length;
    const armstrongSum = digits.reduce((acc, digit) => 
      acc + Math.pow(parseInt(digit), power), 0);
    if (armstrongSum === absNum) properties.push('armstrong');
    
    // Check properties
    if (num % 2 === 0) properties.push('even');
    else properties.push('odd');
    
    // console.log(properties);
    resolve([properties, digitSum]);
    reject(new Error('An error occured getNumberProperties'));  
  })
};

module.exports = { classifyNumber, getNumberProperties };
