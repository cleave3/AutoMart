import Express from 'express';
import validate from '../../validation/validator';
import schemas from '../../validation/schema';
import verifyUser from '../../middleware/auth';
import usersControl from '../controller/user_controller';
import carControl from '../controller/car_controller';

const app = Express.Router();

// USER ROUTES
app.post('/api/v1/auth/signup', validate(schemas.user, 'body'), usersControl.signup);
app.post('/api/v1/auth/signin', usersControl.login);
app.patch('/api/v1/auth/reset', validate(schemas.reset, 'body'), usersControl.passwordReset);

// CAR ROUTE
app.post('/api/v1/car', validate(schemas.car, 'body'), verifyUser, carControl.postCar);
app.get('/api/v1/car/:id', carControl.getACar);
app.get('/api/v1/car', carControl.getUnsoldCars);

export default app;
