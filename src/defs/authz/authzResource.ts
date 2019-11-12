export interface Ownership {
  name: string;
  id: string;
}

export default interface AuthzResourceRepresentation {
  _id: string;
  name: string;
  ower: Ownership;
  ownerManagedAccess: string;
  type: string;
  urls: string[];
}
