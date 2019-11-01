import {Logic} from './logic';
export default interface PermissionRepresentation {
  decisionStrategy: string;
  description: string;
  id: string;
  logic: Logic;
  name: string;
  resourceType: string;
  type: string;
}
