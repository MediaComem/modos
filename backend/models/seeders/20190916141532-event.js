const Event = require('../event');

const up = async () => {
    const eventCount = await Event.countDocuments({});
    if (eventCount === 0) {
        await Event.create({
            _id: '5d7f90bd348ea6025b32ee82',
            owner: '5d7f91c5bc704d0283ad7a87',
            title: 'My super event',
            password: 'My secret pa$$w0rd',
            beginning: new Date(),
            ending: new Date(),
            objective: 'this is my super event objective',
            numberOfImages: 42
        });
        await Event.create({
            owner: '5d7f91c5bc704d0283ad7a87',
            title: 'My super event II',
            password: 'My secret pa$$w0rd',
            beginning: new Date(),
            ending: new Date(),
            objective: 'this is another super event objective',
            numberOfImages: 42
        });
        console.log('Event seeds have been inserted successfully')
    }
};

const down = async () => {
    await Event.deleteMany({});
    console.log('All events have been removed from the database successfully');
};

module.exports = {
    up: up,
    down: down
}
