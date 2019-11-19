import axios from "axios";

module.exports = async (req, res) => {
    const { url } = req.query;
    const responseRaw = await axios.get(url);
    const html = responseRaw.data;
    const startIndex = html.indexOf("<title>") + 7;
    const endIndex = html.indexOf("</title>");
    const title = html.substring(startIndex, endIndex);
    res.json({ title });
};
