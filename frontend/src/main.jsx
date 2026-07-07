import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";

// Явное создание HTTP-ссылки полностью устраняет баг Invariant Violation в Vite
const link = new HttpLink({
  uri: "http://127.0.0.1:8001/graphql/",
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);