"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://gorest.co.in/public/v2/graphql",
  cache: new InMemoryCache(),
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      <div className="flex-grow bg-gray-50 p-5">{children}</div>
    </ApolloProvider>
  );
}
