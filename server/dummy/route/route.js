import Express from 'express';
import validate from '../../validation/validator';
import schemas from '../../validation/schema';
import verifyUser from '../../middleware/auth';
import verifyAdmin from '../../middleware/admin_auth';
import usersControl from '../controller/user_controller';
import carControl from '../controller/car_controller';

const app = Express.Router();

const { signup, login, passwordReset } = usersControl;
const {
  postCar, getACar, getAllCars, getUnsoldCars,
  getUnsoldCarsByPrice, updateCarStatus, updateCarPrice, deleteCar,
} = carControl;

// USER ROUTES
app.post('/api/v1/auth/signup', validate(schemas.user, 'body'), signup);
app.post('/api/v1/auth/signin', validate(schemas.signin, 'body'), login);
app.patch('/api/v1/auth/reset', validate(schemas.reset, 'body'), passwordReset);

// CAR ROUTE
app.post('/api/v1/car', validate(schemas.car, 'body'), verifyUser, postCar);
app.get('/api/v1/car/:id', getACar);
app.get('/api/v1/car', verifyAdmin, getAllCars);
app.get('/api/v1/car', getUnsoldCars);
app.get('/api/v1/car', getUnsoldCarsByPrice);
app.patch('/api/v1/car/:id/status', verifyUser, updateCarStatus);
app.patch('/api/v1/car/:id/price', verifyUser, updateCarPrice);
app.delete('/api/v1/car/:id', verifyAdmin, deleteCar);

export default app;
