import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

const db = new DynamoDBClient({});

export const handler = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);

    const result = await db.send(
      new QueryCommand({
        TableName: "Users",
        IndexName: "email-index",
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: { ":e": email }
      })
    );

    if (result.Items.length === 0) {
      return { statusCode: 401, body: "Email tidak ditemukan" };
    }

    const user = result.Items[0];

    if (user.password !== password) {
      return { statusCode: 401, body: "Password salah" };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        userId: user.userId,
        email: user.email,
        role: user.role
      })
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
