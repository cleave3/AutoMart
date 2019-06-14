import Express from 'express';
import validate from '../validation/validator';
import schemas from '../validation/schema';
import userControl from '../controller/user_controller';

const app = Express.Router();

const { signup, login } = userControl;

// USER ROUTES
app.post('/api/v1/auth/signup', validate(schemas.user, 'body'), signup);
app.post('/api/v1/auth/signin', validate(schemas.signin, 'body'), login);

export default app;
