import express from 'express';
import router from './router/router';
const port: number = 3001;

const app: express.Application = express();
app.use(express.json());
app.use(router)


app.listen(port, () => {
    console.log(`Api is hosted on port: ${port}`);
});