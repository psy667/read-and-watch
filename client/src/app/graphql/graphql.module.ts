import {APP_INITIALIZER, NgModule} from '@angular/core';
import {Apollo, ApolloModule} from 'apollo-angular';
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import {ApolloLink, split} from 'apollo-link';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {environment} from '@src/environments/environment';
import {ReactiveFormsModule} from '@angular/forms';
import result from '@src/types.generated';
import {AuthService} from '@src/app/services/auth.service';

const uri = environment.server || 'http://localhost:8000/'; // <-- add the URL of the GraphQL server here

const initialState = {};

interface Definition {
  kind: string;
  operation?: string;
}

export function onStartup(apollo: Apollo, authService: AuthService) {

  // const offlineLink = new OfflineLink({
  //     storage: localDatabase,
  //     retryInterval: 3000,
  //     sequential: true
  // });

  const offlineIsSet = false;

  return async () => {

    // const errorLink = onError(
    //     ({operation, graphQLErrors, networkError, response}) => {
    //     if (networkError) {
    //         console.log(`[Network error]:`, networkError);
    //     }
    //     console.log(operation);
    //
    //     console.log(response);
    //     // return Observable.of();
    // });

    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: result,
    });

    const cache = new InMemoryCache(
        {fragmentMatcher}
    );


    // TODO: this is actually a security risk, cookie auth should be preferred, but may have some issues with ws/wss

    // TODO: this works with only one service, so generally services should not contain any subscriptions
    // Instead we should have a special, "subscriptions" service which is able to properly handle all api calls
    // It should use a separate url and a custom ingress route also


    // const apiLink = split(
    //     // split based on operation type
    //     ({query}) => {
    //       const {kind, operation}: Definition = getMainDefinition(query);
    //       return kind === 'OperationDefinition' && operation === 'subscription';
    //     },
    // );

    const authMiddleware = new ApolloLink((operation, forward) => {
      const token = localStorage.getItem('token');

      const headers: any = {};

      if (token) {
        headers.token = token;
      }

      operation.setContext({
        headers
      });

      return forward(operation);
    });


    const link = ApolloLink.from([
      authMiddleware,
    ]);

    // cache.writeData(initialState);

    // await persistCache({
    //     cache,
    //     storage: localDatabase,
    //     trigger: 'write',
    //     serialize: false
    // });
    const link = httpLink.create({
      uri: uri,
      withCredentials: true,
      method: 'GET'
    });

    apollo.create({
      link,
      cache,
      resolvers: [
      ],
      typeDefs: ``,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-first',
          errorPolicy: 'all',
        },
        query: {
          fetchPolicy: 'cache-first',
          errorPolicy: 'all',
        },
        mutate: {
          errorPolicy: 'all'
        }
      }
    });

    const apolloClient = apollo.getClient();

    // We watch for token to reconnect the websocket properly
    let lastToken = localStorage.getItem('token');
    authService.token$.subscribe(it => {
      if (lastToken !== it) {
        lastToken = it;
      }
    });
  };
}

@NgModule({
  exports: [HttpClientModule, ApolloModule],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: onStartup,
      deps: [
        Apollo,
        AuthService,
      ],
      multi: true
    }
  ],
})
export class GraphQLModule {
}
