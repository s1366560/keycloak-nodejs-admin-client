import {Logic} from '../logic';
import {DecisionStrategy} from '../decisionStrategy';

export interface Group {
  id: string;
  extendChildren: boolean;
}

export default interface AuthzGroupBasePolicy {
  id?: string;
  name?: string;
  type?: string;
  logic?: Logic;
  description?: string;
  decisionStrategy?: DecisionStrategy;
  groups?: Group[];
  groupsClaim?: string;
}
