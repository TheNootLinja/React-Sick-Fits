import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';

// TODO: Swap with our own styles
import '../components/styles/nprogress.css';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

// Using the getInitialProps function which is async
MyApp.getInitialProps = async function ({ Component, ctx }) {
  // Creating an variable that is equal to an empty object at the start
  let pageProps = {};
  // Checking if the component that was passed in has initial props
  if (Component.getInitialProps) {
    // If it does, set pageProps to the value returned from Component.getInitialProps(ctx)
    pageProps = await Component.getInitialProps(ctx);
  }
  // setting the query property of the pageProps variable to ctx.query
  pageProps.query = ctx.query;
  // returning the destructured pageProps object
  return { pageProps };
};

export default withData(MyApp);
