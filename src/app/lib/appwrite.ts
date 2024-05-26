import { Account, Client } from 'appwrite';

export const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66530e6100035b6d8727');

export const account = new Account(client);
export { ID } from 'appwrite';
