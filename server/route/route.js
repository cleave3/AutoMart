import Express from 'express';
import validate from '../validation/validator';
import schemas from '../validation/schema';
import usersControl from '../dummy/controller/user_controller';
import carControl from '../dummy/controller/car_controller';

const app = Express.Router();

// USER ROUTES
app.post('/api/v1/auth/signup', validate(schemas.user, 'body'), usersControl.signup);
app.post('/api/v1/auth/signin', usersControl.login);
app.patch('/api/v1/auth/reset', validate(schemas.reset, 'body'), usersControl.passwordReset);

// CAR ROUTE
app.post('/api/v1/car', validate(schemas.car, 'body'), carControl.postCar);

export default app;
