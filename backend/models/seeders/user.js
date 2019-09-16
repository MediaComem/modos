const User = require('../user');

const up = () => {
    User.countDocuments({}, (err, usersCount) => {
        if (usersCount === 0) {
            User.create({
                pseudonym: 'kjvui',
                email: 'kjuvi@dlc.com',
                password: 'secretkey',
                events: [],
            });
        }
    });
};

const down = () => {
    User.deleteMany({}, (err) => {
        console.log('All users have been removed from the database successfully');
    });
};

module.exports = {
    up: up,
    down: down
}
