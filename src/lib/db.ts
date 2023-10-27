import { MongoClient } from "mongodb";

const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.b15eibg.mongodb.net/?retryWrites=true&w=majority`;

export async function connectToDatabase() {
  const client = new MongoClient(url);
  await client.connect();

  return client;
}
