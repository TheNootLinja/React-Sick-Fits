import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!) {
        deleteProduct(id: $id) {
            id
            name
        }
    }
`;

function update(cache, payload) {
    console.log(payload);
    console.log('Running the update function')
    cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
    const [deleteProduct, {loading}] = useMutation
    (DELETE_PRODUCT_MUTATION, {
        variables: {id},
        update,
    });

    return (
    <button 
    type='button' 
    onClick={() => {
        if(confirm('Are you sure you want to do that?')) {
            // If user confirms delete, delete product
            console.log('DELETING!');
            deleteProduct().catch((err) => alert(err.message));
        }
    }}
    disabled={loading}
    >
        {children}
    </button>
    )}