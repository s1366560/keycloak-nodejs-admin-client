export interface Ownership {
  name: string;
  id: string;
}

export default interface AuthzResource {
  _id: string;
  name: string;
  ower: Ownership;
  ownerManagedAccess: string;
  type: string;
  urls: string[];
}
