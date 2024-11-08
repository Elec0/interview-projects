import { migrateDb } from "@/db/migrate";

const executeMigration = async () => {
    global.console.log('Migrating database...');
    await migrateDb();

    global.console.log('Migration complete.');
};

executeMigration().catch((error) => {
    console.error(error);
    process.exit(1);
});
