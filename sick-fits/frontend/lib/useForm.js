import { useState } from 'react';

export default function useForm(initial = {}) {
  // Create a state object for our inputs and the method for changing them
  const [inputs, setInputs] = useState(initial);

  // Setting up the actual function for updating state so it can be surfaced
  function handleChange(e) {
    // Destructuring e.target into the properties so we can use them without e.target. infront of them
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    // This is just something funky that needs to be done when working with files
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      // Copy the existing state
      ...inputs,
      // Dynamically check which piece of state needs to be updated based on the name of the input
      // and set it to the value of the target
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    // Here we are creating an array of the items with keys and values, changing the values to empty strings, then passing
    // that blank value array into an Objects.fromEntries which turns it back into an object, and passing that to setInputs
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // You must return the functionality/data that you want to surface from the custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
