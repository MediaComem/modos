const User = require('../user');

const up = () => {
    User.countDocuments({}, (err, usersCount) => {
        if (usersCount === 0) {
            User.create({
                _id: '5d7f91c5bc704d0283ad7a87',
                pseudonym: 'john',
                email: 'john@doe.com',
                password: 'secretkey',
            });
        }
    });
};

const down = () => {
    User.remove({}, (err) => {
        console.log('All users have been removed from the database successfully');
    });
};

module.exports = {
    up: up,
    down: down
}
