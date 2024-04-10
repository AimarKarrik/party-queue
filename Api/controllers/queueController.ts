import express from "express";
import spotify from "../services/SpotifyService";

const queueController = express.Router();

queueController.get('/', async (req, res) => {
    const queue = await spotify.player.getUsersQueue();

    res.status(200).send(queue);
});

export default queueController;