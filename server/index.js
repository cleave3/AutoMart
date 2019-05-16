import Express from 'express';
import bodyParser from 'body-parser';

const app = Express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).send('App is running'));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
