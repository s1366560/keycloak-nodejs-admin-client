import Resource from './resource';
import PermissionRepresentation from '../defs/permissionRepresentation';
import {KeycloakAdminClient} from '../client';
import ScopeRepresentation from '../defs/scopeRepresentation';
import ResourceRepresentation from '../defs/resourceRepresentation';
import AuthzResource from '../defs/authzResource';

export class Authz extends Resource<{realm?: string}> {
  public listPermissions = this.makeRequest<
    {
      clientId: string;
      first: number;
      max: number;
      name?: string;
      scope?: string;
    },
    PermissionRepresentation[]
  >({
    method: 'GET',
    path: '/permission',
    urlParamKeys: ['clientId'],
    catchNotFound: true,
  });

  public listScopes = this.makeRequest<
    {clientId: string; deep: boolean; first: number; max: number},
    ScopeRepresentation[]
  >({
    method: 'GET',
    path: '/scope',
    urlParamKeys: ['clientId'],
    catchNotFound: true,
  });

  public listResources = this.makeRequest<
    {
      clientId: string;
      deep: boolean;
      first: number;
      max: number;
      name?: string;
      type?: string;
      owner?: string;
    },
    AuthzResource[]
  >({
    method: 'GET',
    path: '/resource',
    urlParamKeys: ['clientId'],
    catchNotFound: true,
  });

  public createScope = this.makeRequest<
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
