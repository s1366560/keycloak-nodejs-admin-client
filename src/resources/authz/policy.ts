import Resource from '../resource';
import {KeycloakAdminClient} from '../../client';
import PolicyRepresentation from '../../defs/policyRepresentation';
import AuthzGroupBasePolicy from '../../defs/authz/groupBasePolicy';
import AuthzGroupPolicy from './groupPolicy';

export default class AuthzPolicy extends Resource<{realm?: string}> {
  public groupBase: AuthzGroupPolicy;

  // policies

  public find = this.makeRequest<
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

  constructor(client: KeycloakAdminClient) {
    super(client, {
      path: '/admin/realms/{realm}/clients/{clientId}/authz/resource-server',
      getUrlParams: () => ({
        realm: client.realmName,
      }),
      getBaseUrl: () => client.baseUrl,
    });

    this.groupBase = new AuthzGroupPolicy(client);
  }
}
