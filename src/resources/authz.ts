import Resource from './resource';
import PermissionRepresentation from '../defs/permissionRepresentation';
import {KeycloakAdminClient} from '../client';
import ScopeRepresentation from '../defs/scopeRepresentation';
import ResourceRepresentation from '../defs/resourceRepresentation';
import AuthzResource from '../defs/authzResource';
import PolicyRepresentation from '../defs/policyRepresentation';
import AuthzGroupBasePolicy from '../defs/authz/groupBasePolicy';

export class Authz extends Resource<{realm?: string}> {
  // permissions

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

  public listAssociatedPolicies = this.makeRequest<
    {
      clientId: string;
      permissionId: string;
      first: number;
      max: number;
    },
    PolicyRepresentation[]
  >({
    method: 'GET',
    path: '/policy/{permissionId}/associatedPolicies',
    urlParamKeys: ['clientId', 'permissionId'],
    catchNotFound: true,
  });
  // scope

  public listScopes = this.makeRequest<
    {clientId: string; deep: boolean; first: number; max: number},
    ScopeRepresentation[]
  >({
    method: 'GET',
    path: '/scope',
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

  // resources

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

  // policies

  public listPolicy = this.makeRequest<
    {
      clientId: string;
      deep: boolean;
      first: number;
      max: number;
      permission: boolean;
    },
    PolicyRepresentation[]
  >({
    method: 'GET',
    path: '/policy',
    urlParamKeys: ['clientId'],
    catchNotFound: true,
  });

  public listGroupPolicy = this.makeRequest<
    {clientId: string; first: number; max: number; permission: boolean},
    AuthzGroupBasePolicy[]
  >({
    method: 'GET',
    path: '/policy/group',
    urlParamKeys: ['clientId'],
    catchNotFound: true,
  });

  public createGroupPolicy = this.makeUpdateRequest<
    {clientId: string},
    AuthzGroupBasePolicy,
    AuthzGroupBasePolicy
  >({
    method: 'POST',
    path: '/policy/group',
    urlParamKeys: ['clientId'],
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
