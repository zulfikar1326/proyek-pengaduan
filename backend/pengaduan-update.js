import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const db = new DynamoDBClient({});

export const handler = async (event) => {
  try {
    const pengaduanId = event.pathParameters.id;
    const body = JSON.parse(event.body);

    let updateExp = "SET updatedAt = :u";
    let attrValues = {
      ":u": new Date().toISOString()
    };
    let attrNames = {};

    if (body.judul) {
      updateExp += ", judul = :j";
      attrValues[":j"] = body.judul;
    }

    if (body.deskripsi) {
      updateExp += ", deskripsi = :d";
      attrValues[":d"] = body.deskripsi;
    }

    if (body.status) {
      updateExp += ", #st = :s";
      attrValues[":s"] = body.status;
      attrNames["#st"] = "status";
    }

    await db.send(
      new UpdateCommand({
        TableName: "Pengaduan",
        Key: { pengaduanId },
        UpdateExpression: updateExp,
        ExpressionAttributeValues: attrValues,
        ExpressionAttributeNames:
          Object.keys(attrNames).length > 0 ? attrNames : undefined
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Pengaduan berhasil diupdate" })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
