import { createConnection } from "typeorm";
import "reflect-metadata";


// Open a connection pool for the database.
createConnection().then(async connection => {

    // Start with a clean database
    const dropBeforeSync = true;
    connection.synchronize(dropBeforeSync);

    console.log("database created.");

}).catch(error => console.log(error));
