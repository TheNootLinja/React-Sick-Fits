// Setting up our function to convert cents to dollars
export default function formatMoney(amount = 0) {
  // Passing in the options object
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  // Check if the amount is a whole number
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  // Creating a new formatter from the number format api
  const formatter = Intl.NumberFormat('en-US', options);

  // Feeding out product price into the function divided by 100 to account for having it stored in cents
  return formatter.format(amount / 100);
}
