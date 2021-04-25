import { mergeDeep } from '@apollo/client/utilities';
import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // Tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We do not have any items, must go to network to fetch
        return false;
      }
      // If there are items, return them from the cache, no need to fetch
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache. Sending them to apollo`
        );
        return items;
      }

      return false; // Fallback to network just in case

      // First it asks the read function for those items
      // Here, we can do one of two things
      // First thing we can do is return the items because they are already in the cache.
      // Other thing is to retuyrn false from here (network request)
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the Apollo client comes back from the network with our products
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // finally we return the merged items from the cache
      return merged;
    },
  };
}
