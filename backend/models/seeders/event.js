const User = require('../user');
const Event = require('../event');

const up = () => {
    User.findOne({ pseudonym: 'kjuvi' }).exec()
        .then((user) => {
            if (user) {
                Event.countDocuments({}, (err, eventCount) => {
                    if (eventCount === 0) {
                        Event.create({
                            owner: user._id,
                            password: '',
                            beginning: new Date(),
                            ending: new Date(),
                            objective: 'testing event',
                            numberOfImages: 42
                        });
                    }
                });
            }
        });
};

const down = () => {
    Event.deleteMany({}, (err) => {
        console.log('All events have been removed from the database successfully');
    });
};

module.exports = {
    up: up,
    down: down
}
