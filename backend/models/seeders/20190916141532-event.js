const Event = require('../event');

const up = () => {
    Event.countDocuments({}, (err, eventCount) => {
        if (eventCount === 0) {
            Event.create({
                _id: '5d7f90bd348ea6025b32ee82',
                owner: '5d7f91c5bc704d0283ad7a87',
                beginning: new Date(),
                ending: new Date(),
                objective: 'this is an event',
                numberOfImages: 42
            });
        }
    })
};

const down = () => {
    Event.remove({}, (err) => {
        console.log('All events have been removed from the database successfully');
    });
};

module.exports = {
    up: up,
    down: down
}
