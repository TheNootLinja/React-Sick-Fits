import { useQuery } from '@apollo/client';
import { id } from 'date-fns/locale';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products() {
  // We do not need a callback function for the variables below as they are reactive
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  console.log(data, error, loading);
  // This could be replaced with a loader animation
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}
