// Custom hook for form inputs state
import { useMutation } from '@apollo/client';
import { UniqueInputFieldNamesRule } from 'graphql';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Form from './styles/Form';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Defining variables we will be passing in and their types
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      # Passing in the variables to their corresponding props in the data object
      data: {
        name: $name
        description: $description
        price: $price
        # TODO: This will need to be changed to not be a hardcoded value
        status: "AVAILABLE"
        # For the photo we can't just past the image variable and need to use the code below for images/files
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      # What we want the query to return after it runs without any errors
      id
      price
      description
      name
    }
  }
`;

// Creating our CreateProduct component
export default function CreateProduct() {
  // Using our custom hook to create our state object and the method for updating it
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    // Setting our initial state
    image: '',
    name: 'Nike Vaporwaves',
    price: 23755,
    description: 'These shoes will match any vaporwave outfit',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    // Submit input fields to the backend
    await createProduct();
    clearForm();
  }

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY}],
    }
  );
  return (
    // On each of these inputs we are setting the value using the inputs state object and passing the
    // handleChange as our onChange function
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          {/* TODO: Need to rework code so that it also clears the selected image from this input */}
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>
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
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type="submit">+ Add Product</button>
    </Form>
  );
}
