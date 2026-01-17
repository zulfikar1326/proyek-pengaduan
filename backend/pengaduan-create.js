import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const db = new DynamoDBClient({});

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { userId, judul, deskripsi } = body;

    await db.send(
      new PutCommand({
        TableName: "Pengaduan",
        Item: {
          pengaduanId: randomUUID(),
          userId,
          judul,
          deskripsi,
          status: "MENUNGGU",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      })
    );

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Pengaduan berhasil dibuat" })
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
