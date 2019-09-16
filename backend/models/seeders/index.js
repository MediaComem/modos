const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

// require each seeder file in an array
// each file must have the "up()" and "down()" function
const seeders = fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .map(file => {
        return require(path.join(__dirname, file));
    });

const seedAll = () => {
    seeders.forEach(seeder => {
        seeder.up();
    });
}

const undoAll = () => {
    seeders.forEach(seeder => {
        seeder.down();
    })
}

module.exports = {
    seedAll: seedAll,
    undoAll: undoAll
}
