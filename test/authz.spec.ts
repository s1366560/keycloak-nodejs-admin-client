// tslint:disable:no-unused-expression
import * as chai from 'chai';
import {KeycloakAdminClient} from '../src/client';
import {credentials} from './constants';
import faker from 'faker';
import ClientRepresentation from '../src/defs/clientRepresentation';
import ProtocolMapperRepresentation from '../src/defs/protocolMapperRepresentation';
import ClientScopeRepresentation from '../src/defs/clientScopeRepresentation';
const expect = chai.expect;

declare module 'mocha' {
  // tslint:disable-next-line:interface-name
  interface ISuiteCallbackContext {
    kcAdminClient?: KeycloakAdminClient;
    currentClient?: ClientRepresentation;
    currentClientScope?: ClientScopeRepresentation;
    currentRoleName?: string;
  }
}

describe('authz', () => {
  before(async () => {
    this.kcAdminClient = new KeycloakAdminClient();
    await this.kcAdminClient.auth(credentials);

    // create client and also test it
    // NOTICE: to be clear, clientId stands for the property `clientId` of client
    // clientUniqueId stands for property `id` of client
    const clientId = faker.internet.userName();
    const createdClient = await this.kcAdminClient.clients.create({
      clientId,
    });
    expect(createdClient.id).to.be.ok;

    const client = await this.kcAdminClient.clients.findOne({
      id: createdClient.id,
    });
    expect(client).to.be.ok;
    this.currentClient = client;

    const {id: clientUniqueId} = this.currentClient;
    await this.kcAdminClient.clients.update(
      {id: clientUniqueId},
      {
        // clientId is required in client update. no idea why...
        clientId,
        authorizationServicesEnabled: true,
        directAccessGrantsEnabled: true,
        serviceAccountsEnabled: true,
      },
    );

    const findClient = await this.kcAdminClient.clients.findOne({
      id: clientUniqueId,
    });
    expect(findClient).to.include({
      authorizationServicesEnabled: true,
    });
  });

  after(async () => {
    // delete the current one
    await this.kcAdminClient.clients.del({
      id: this.currentClient.id,
    });
  });

  it('should be able tolist permissions', async () => {
    const first = 0;
    const max = 20;
    const clientUniqueId = this.currentClient.id;
    const permissions = await this.kcAdminClient.authz.listPermissions({
      id: clientUniqueId,
      first,
      max,
    });

    // expect(permissions, 'load permissions').to.be.ok;
    expect(permissions.length, 'not empty').to.be.equal(1);
  });
});
