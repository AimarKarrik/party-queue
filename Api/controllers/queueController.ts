import express from "express";

const queueController = express.Router();

const queue: string[] = [];
const queueHistory: string[] = [];

queueController.get('/', async (req, res) => {
    res.status(200).send(queue);
});

queueController.post('/', async (req, res) => {
    const song: string = req.body.song as string;

    if (queue.includes(song)) {
        res.status(400).send("Song already in queue");
        return;
    }

    queue.push(song);
    res.status(200).send(queue);
});

queueController.delete('/', async (req, res) => {
    const song: string = req.body.song as string;

    if (!queue.includes(song)) {
        res.status(400).send("Song not in queue");
        return;
    }

    queue.splice(queue.indexOf(song), 1);
    res.status(200).send(queue);
});


queueController.put('/', async (req, res) => {
    const song: string = req.body.song as string;
    const newPosition: number = req.body.newPosition as number;

    if (!queue.includes(song)) {
        res.status(400).send("Song not in queue");
        return;
    }

    if (newPosition < 0 || newPosition >= queue.length || newPosition === queue.indexOf(song) || newPosition === 0) {
        res.status(400).send("Invalid position");
        return;
    }

    queue.splice(queue.indexOf(song), 1);
    queue.splice(newPosition, 0, song);
    res.status(200).send(queue);
});

// next song
queueController.get('/next', async (req, res) => {
    const song: string | undefined = queue.shift();
    if (!song) {
        res.status(400).send("No songs in queue");
        return;
    }
    queueHistory.push(song);
    res.status(200).send(song);
});

// previous song
queueController.get('/previous', async (req, res) => {
    const song: string | undefined = queueHistory.pop();
    if (!song) {
        res.status(400).send("No songs in history");
        return;
    }
    queue.unshift(song);
    res.status(200).send(song);
});

export default queueController;