import express from "express";
const youtubesearchapi = require("youtube-search-api");

const searchController = express.Router();



searchController.get('/', async (req, res) => {
    const query: string = req.query.q as string;
    const search: any[] = []
    youtubesearchapi.GetListByKeyword(query, false, 20, [{ type: "video" }]).then((data: any) => {
        search.push(data.items);

        res.status(200).send(search);
    });
});

export default searchController;