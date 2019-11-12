import Resource from '../resource';
import {KeycloakAdminClient} from '../../client';

export default class AuthzResource extends Resource<{realm?: string}> {
  // resources

  public find = this.makeRequest<
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
