import express from "express";
import spotify from "../services/SpotifyService";

const searchController = express.Router();

searchController.get('/', async (req, res) => {
    const query: string = req.query.q as string;
    const search = await spotify.search(query, ['track'])

    res.status(200).send(search);
});

export default searchController;