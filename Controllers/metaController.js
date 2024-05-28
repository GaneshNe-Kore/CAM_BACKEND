const metaService = require("../Services/metaService.js")
var getMeta = (req, res) =>
{
    var metaResponse = [];
    const { category } = req.query;
    if (category)
    {
        metaResponse.push(metaService.getMetaData(category));
    }
    res.status(200).json(metaResponse);
};

var postMeta = (req, res) =>
{
    // Handle POST request
    res.json({ message: 'POST request to the homepage' });
};
module.exports = {
    getMeta, postMeta
}
