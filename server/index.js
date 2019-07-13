import Express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import Route from './route/route';
import swaggerDocument from '../swagger.json';

dotenv.config();

const app = Express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', Route);

app.get('/', (req, res) => res.status(200).json('AutoMart is running'));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

export default app;
