const mongoose = require('mongoose');
const seeders = require('./models/seeders')
const config = require('./configs/config');

Promise.resolve().then(seed).catch(err => {
    console.error('Database seed failed');
    console.error(err.stack);
    process.exit(1);
});

async function seed() {

    // Connect the database.
    await mongoose.connect(
        config.databaseUrl,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }
    );

    // Wipe out the database and repopulate it with fake records.
    await seeders.undoAll();
    await seeders.seedAll();

    // Disconnect from the database once done, otherwise the script keeps running.
    await mongoose.disconnect();
}
