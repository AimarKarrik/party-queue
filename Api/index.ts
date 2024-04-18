import express from 'express';
const cors = require('cors');
import router from './router/router';
const port: number = 3001;

const app: express.Application = express();
app.use(cors());
app.use(express.json());
app.use(router)


app.listen(port, () => {
    console.log(`Api is hosted on port: ${port}`);
});