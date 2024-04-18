import express from "express";
const youtubesearchapi = require("youtube-search-api");

const searchController = express.Router();



searchController.get('/', async (req, res) => {
    const query: string = req.query.q as string;
    youtubesearchapi.GetListByKeyword(query, false, 20, [{ type: "video" }]).then((data: any) => {

        res.status(200).send(data.items);
    });
});

export default searchController;