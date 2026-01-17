import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

const db = new DynamoDBClient({});

export const handler = async () => {
  try {
    const data = await db.send(
      new ScanCommand({
        TableName: "Pengaduan"
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