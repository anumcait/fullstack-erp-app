// src/appwriteConfig.js
import { Client, Databases, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your endpoint
  .setProject('fullstack-hr-app'); // Your project ID

const databases = new Databases(client);

export { client, databases, ID };