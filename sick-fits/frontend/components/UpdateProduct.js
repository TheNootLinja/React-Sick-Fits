import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";

// GQL query for fetching a single product
const SINGLE_PRODUCT_QUERY = gql`
    query SINGLE_PRODUCT_QUERY($id: ID!) {
        Product(where: {
            id: $id
        }){
            id
            name
            description
            price
        }
    }
`;

// GQL query for updating a single product
const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION(
        $id: ID!
        $name: String
        $description: String
        $price: Int
    ) {
        updateProduct(
            id: $id,
            data: {
                name: $name
                description: $description
                price: $price
            }
        ) {
            id
            name
            description
            price
        }
    }
`;

// Creating updateProduct component
export default function updateProduct({ id }) {
    // Get existing product
    const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
        variables: {
            id
        }
    });

    // Get the mutation to update the product
    const [ updateProduct, { data: updateData, error: updateError, loading: updateLoading }] = useMutation(UPDATE_PRODUCT_MUTATION);

    // Create state for the update form inputs
    const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

    if(loading) return <p>Loading...</p>;

    async function submitForm(e) {
        e.preventDefault();
        const res = await updateProduct({
            variables: {
                id: id,
                name: inputs.name,
                prict: inputs.price,
                description: inputs.description
            }
        }).catch(console.error);
        console.log(res);
    }

    // TODO: #3. We nee the form to handle the updatess
    return (
        // On each of these inputs we are setting the value using the inputs state object and passing the
        // handleChange as our onChange function
        // TODO: Handle the submit of the form!
        <Form onSubmit={submitForm}>
          <DisplayError error={error || updateError} />
    
          <fieldset disabled={updateLoading} aria-busy={updateLoading}>
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
          <button type="submit">Update Product</button>
        </Form>
      );
}