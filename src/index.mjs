import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "Todos";

export const handler = async (event) => {
    try {
        const method = event.requestContext?.http?.method;

        // GET /todos
        if (method === "GET") {
            const data = await docClient.send(new ScanCommand({
                TableName: TABLE_NAME
            }));

            return {
                statusCode: 200,
                body: JSON.stringify(data.Items || [])
            };
        }

        // POST /todos
        if (method === "POST") {
            const body = JSON.parse(event.body);

            await docClient.send(new PutCommand({
                TableName: TABLE_NAME,
                Item: {
                    id: body.id,
                    task: body.task
                }
            }));

            return {
                statusCode: 201,
                body: JSON.stringify({ message: "Todo created successfully" })
            };
        }

        // DELETE /todos/{id}
        if (method === "DELETE") {
            const id = event.pathParameters?.id;

            await docClient.send(new DeleteCommand({
                TableName: TABLE_NAME,
                Key: { id }
            }));

            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Todo deleted successfully" })
            };
        }

        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Unsupported route" })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
