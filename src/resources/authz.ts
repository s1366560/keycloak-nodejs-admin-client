import Resource from './resource';
import {KeycloakAdminClient} from '../client';
import Permission from './authz/permission';
import {Scope} from './authz/scope';
import AuthzResource from './authz/resource';
import AuthzPolicy from './authz/policy';

export class Authz extends Resource<{realm?: string}> {
  public permissions: Permission;
  public scopes: Scope;
  public resources: AuthzResource;
  public policies: AuthzPolicy;

  constructor(client: KeycloakAdminClient) {
    super(client, {
      path: '/admin/realms/{realm}/clients/{clientId}/authz/resource-server',
      getUrlParams: () => ({
        realm: client.realmName,
      }),
      getBaseUrl: () => client.baseUrl,
    });

    this.permissions = new Permission(client);
    this.scopes = new Scope(client);
    this.resources = new AuthzResource(client);
    this.policies = new AuthzPolicy(client);
  }
}
