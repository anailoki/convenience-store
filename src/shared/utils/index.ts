const generateRandomArray = () => {
  const randomArray = [];
  for (let i = 0; i < 8; i++) {
    const randomNumber = Math.floor(Math.random() * 50) + 1;
    randomArray.push(randomNumber);
  }
  return randomArray;
};

const formatCurrency = (value: number, showCurrency: boolean = true) => {
  return new Intl.NumberFormat('es-MX', {
    style: showCurrency ? 'currency' : 'decimal',
    currency: 'MXN',
  }).format(value);
};

export const UTILS = {
  generateRandomArray,
  formatCurrency,
};
