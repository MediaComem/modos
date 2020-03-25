const pkg = require('../../../package.json');


const getRoot = (req, res) => {
    return res.status(200).json({
        version: pkg.version
    });
};


module.exports = {
    getRoot: getRoot
}
