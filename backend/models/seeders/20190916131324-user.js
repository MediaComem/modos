const User = require('../user');

const up = async () => {
    try {
        const userCount = await User.countDocuments({});
        if (userCount === 0) {
            await User.create({
                _id: '5d7f91c5bc704d0283ad7a87',
                pseudonym: 'john',
                email: 'john@doe.com',
                password: 'secretkey'
            });
            console.log('User seeds have been inserted successfully')
        }
    } catch (err) {
        console.log(err);
    }
};

const down = async () => {
    try {
        await User.deleteMany({});
        console.log('All users have been removed from the database successfully');
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    up: up,
    down: down
}
