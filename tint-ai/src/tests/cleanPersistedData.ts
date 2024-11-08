import { dbClient, schema } from "@/db/dbClient";

beforeEach(async () => {
    await dbClient.delete(schema.underwritingDetails);
});