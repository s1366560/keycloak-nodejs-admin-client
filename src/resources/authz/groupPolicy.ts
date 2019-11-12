import Resource from '../resource';
import KeycloakAdminClient from '../..';
import AuthzGroupBasePolicy from '../../defs/authz/groupBasePolicy';

export default class AuthzGroupPolicy extends Resource<{realm?: string}> {
  public find = this.makeRequest<
    {clientId: string; first: number; max: number; permission: boolean},
    AuthzGroupBasePolicy[]
  >({
    method: 'GET',
    path: '/policy/group',
    urlParamKeys: ['clientId'],
    catchNotFound: true,
  });

  public create = this.makeUpdateRequest<
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
