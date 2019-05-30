import Express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Route from './dummy/route/route';

dotenv.config();

const app = Express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(Route);

app.get('/', (req, res) => res.status(200).send('AutoMart is running'));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

export default app;