import Resource from '../resource';
import {KeycloakAdminClient} from '../../client';
import PermissionRepresentation from '../../defs/permissionRepresentation';
import PolicyRepresentation from '../../defs/policyRepresentation';

export default class Permission extends Resource<{realm?: string}> {
  // permissions

  public find = this.makeRequest<
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

  public findAssociatedPolicies = this.makeRequest<
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
