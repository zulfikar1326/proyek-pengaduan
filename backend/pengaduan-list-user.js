import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

const db = new DynamoDBClient({});

export const handler = async (event) => {
  try {
    const userId = event.queryStringParameters.userId;

    const data = await db.send(
      new QueryCommand({
        TableName: "Pengaduan",
        IndexName: "userId-index",
        KeyConditionExpression: "userId = :u",
        ExpressionAttributeValues: { ":u": userId }
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};