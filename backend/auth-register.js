import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const db = new DynamoDBClient({});

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { email, password } = body;

    if (!email || !password) {
      return { statusCode: 400, body: "Email dan password wajib diisi" };
    }

    const check = await db.send(
      new QueryCommand({
        TableName: "Users",
        IndexName: "email-index",
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: { ":e": email }
      })
    );

    if (check.Items.length > 0) {
      return { statusCode: 400, body: "Email sudah terdaftar" };
    }

    await db.send(
      new PutCommand({
        TableName: "Users",
        Item: {
          userId: randomUUID(),
          email,
          password,
          role: "USER",
          createdAt: new Date().toISOString()
        }
      })
    );

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Register berhasil" })
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};