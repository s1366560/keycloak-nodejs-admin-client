import Resource from '../resource';
import {KeycloakAdminClient} from '../../client';
import ScopeRepresentation from '../../defs/scopeRepresentation';

export class Scope extends Resource<{realm?: string}> {
  // scope

  public find = this.makeRequest<
    {clientId: string; deep: boolean; first: number; max: number},
    ScopeRepresentation[]
  >({
    method: 'GET',
    path: '/scope',
    urlParamKeys: ['clientId'],
    catchNotFound: true,
  });

  public create = this.makeRequest<
    {clientId: string; name: string; displayName: string; iconUri: string},
    ScopeRepresentation
  >({
    method: 'POST',
    path: '/scope',
    urlParamKeys: ['clientId'],
    catchNotFound: true,
  });

  constructor(client: KeycloakAdminClient) {
    super(client, {
      path: '/admin/realms/{realm}/clients/{clientId}/authz/resource-server',
      getUrlParams: () => ({
        realm: client.realmName,
      }),
      getBaseUrl: () => client.baseUrl,
    });
  }
}
