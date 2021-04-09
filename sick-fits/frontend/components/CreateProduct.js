// Custom hook for form inputs state
import useForm from '../lib/useForm';

// Creating our CreateProduct component
export default function CreateProduct() {
  // Using our custom hook to create our state object and the method for updating it
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    // Setting our initial state
    name: 'Nike Vaporwaves',
    price: 23755,
    description: 'These shoes will match any vaporwave outfit',
  });

  return (
    // On each of these inputs we are setting the value using the inputs state object and passing the
    // handleChange as our onChange function
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="price">
        Price
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="description">
        Description
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={inputs.description}
          onChange={handleChange}
        />
      </label>
      <button onClick={clearForm} type="button">
        Clear Form
      </button>
      <button onClick={resetForm} type="button">
        Reset Form
      </button>
    </form>
  );
}
