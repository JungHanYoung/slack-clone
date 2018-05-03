import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloLink } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({ uri: 'http://localhost:8081/graphql' });

const authMiddleware = setContext(() => ({
  headers: {
    "x-token": localStorage.getItem('token'),
    "x-refreshToken": localStorage.getItem('refreshToken')
  }
}));

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const { response: { headers } } = operation.getContext();
    if (headers) {
      const token = headers.get("x-token");
      const refreshToken = headers.get("x-refresh-token");

      if (token) {
        localStorage.setItem("token", token);
      }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
    }

    return response;
  });
});

const link = afterwareLink.concat(authMiddleware.concat(httpLink));


export default new ApolloClient({
      link,
      cache: new InMemoryCache()
})