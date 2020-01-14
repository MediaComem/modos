const User = require('../users');

const up = async () => {
    const userCount = await User.countDocuments({});
    if (userCount === 0) {
        const user = User()
        user._id = '5d7f91c5bc704d0283ad7a87';
        user.pseudonym = 'admin';
        user.email = 'admin@mail.com';
        await user.encryptPassword('1234');
        await User.create(user);

        console.log('User seeds have been inserted successfully')
    }
};

const down = async () => {
    await User.deleteMany({});
    console.log('All users have been removed from the database successfully');
};

module.exports = {
    up: up,
    down: down
}
