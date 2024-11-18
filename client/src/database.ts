
import { MongoClient, Db } from 'mongodb';

const uri="mongodb+srv://rushi:<Rushishah@22>@cluster0.rb9gq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let client: MongoClient;
let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
    if (client) {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db("Clusters"); // Replace with your database name
        console.log("Connected to MongoDB");
    }
    return db;
};

export const getDb = (): Db => db;
