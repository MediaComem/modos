const Event = require('../event');

const up = async () => {
    try {
        const eventCount = await Event.countDocuments({});
        if (eventCount === 0) {
            await Event.create({
                _id: '5d7f90bd348ea6025b32ee82',
                owner: '5d7f91c5bc704d0283ad7a87',
                beginning: new Date(),
                ending: new Date(),
                objective: 'this is an event',
                numberOfImages: 42
            });
            console.log('Event seeds have been inserted successfully')
        }
    } catch (err) {
        console.log(err);
    }
};

const down = async () => {
    try {
        await Event.deleteMany({});
        console.log('All events have been removed from the database successfully');
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    up: up,
    down: down
}
