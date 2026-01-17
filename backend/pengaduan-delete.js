import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const db = new DynamoDBClient({});

export const handler = async (event) => {
  try {
    const pengaduanId = event.pathParameters.id;

    await db.send(
      new DeleteCommand({
        TableName: "Pengaduan",
        Key: { pengaduanId }
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Pengaduan berhasil dihapus" })
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
