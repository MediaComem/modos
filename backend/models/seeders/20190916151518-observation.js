const Observation = require('../observation');

const up = async () => {
    const observationCount = await Observation.countDocuments({});
    if (observationCount === 0) {
        await Observation.create({
            _id: "5d84ac1c9d4c1603538e7999",
            owner: "5d7f91c5bc704d0283ad7a87",
            description: [
                {
                    obstacle: "sidewalk",
                    impact: 2
                }
            ],
            image: [
                {
                    imagePath: "/dataset/event404",
                    width: 1280,
                    height: 720,
                    boundingBox: { x: 20, y: 10, width: 400, height: 500 }
                }
            ]
        });
        console.log('Observation seeds have been inserted successfully')
    }
};

const down = async () => {
    await Observation.deleteMany({})
    console.log('All observations have been removed from the database successfully');
};

module.exports = {
    up: up,
    down: down
}
