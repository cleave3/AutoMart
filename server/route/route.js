import Express from 'express';
import validate from '../validation/validator';
import schemas from '../validation/schema';
import verifyUser from '../middleware/auth';
import userControl from '../controller/user_controller';
import uploader from '../controller/image_controller';
import carControl from '../controller/car_controller';

const app = Express.Router();

const { signup, login } = userControl;
const {
  postCar, getACar, getUnsoldCars,
} = carControl;

// USER ROUTES
app.post('/api/v1/auth/signup', validate(schemas.user, 'body'), signup);
app.post('/api/v1/auth/signin', validate(schemas.signin, 'body'), login);

// CAR ROUTES
app.post('/api/v1/car', verifyUser, uploader.single('image'), validate(schemas.car, 'body'), postCar);
app.get('/api/v1/car/:id', getACar);
app.get('/api/v1/car', getUnsoldCars);

export default app;
