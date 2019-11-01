import Resource from './resource';
import Permission from '../defs/permission';
import {KeycloakAdminClient} from '../client';

export class Authz extends Resource<{realm?: string}> {
  public listPermissions = this.makeRequest<
    {id: string; first: number; max: number; name?: string; scope?: string},
    Permission[]
  >({
    method: 'GET',
    path: '/{id}/authz/resource-server/permission',
    urlParamKeys: ['id'],
    catchNotFound: true,
  });

  constructor(client: KeycloakAdminClient) {
    super(client, {
      path: '/admin/realms/{realm}/clients',
      getUrlParams: () => ({
        realm: client.realmName,
      }),
      getBaseUrl: () => client.baseUrl,
    });
  }
}
