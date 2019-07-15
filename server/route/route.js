import Express from 'express';
import validate from '../validation/validator';
import schemas from '../validation/schema';
import verifyUser from '../middleware/auth';
import verifyAdmin from '../middleware/admin_auth';
import userControl from '../controller/user_controller';
import uploader from '../controller/image_controller';
import carControl from '../controller/car_controller';
import orderControl from '../controller/order_controller';

const app = Express.Router();

const { signup, login } = userControl;
const {
  postCar, getACar, getUnsoldCars, getUnsoldCarsByPrice, getAllCars,
  updateCarStatus, updateCarPrice, deleteCarAd, getCarsByUser, getUnsoldCarsByManufacturer,
} = carControl;
const { makeOrder, updateOrderPrice, getOrdersByUser } = orderControl;

// USER ROUTES
app.post('/auth/signup', validate(schemas.user, 'body'), signup);
app.post('/auth/signin', validate(schemas.signin, 'body'), login);

// CAR ROUTES
app.post('/car', verifyUser, uploader.single('image_url'), validate(schemas.car, 'body'), postCar);
app.get('/car/:id', verifyUser, getACar);
app.get('/car', getUnsoldCars);
app.get('/car', getUnsoldCarsByPrice);
app.get('/car', getUnsoldCarsByManufacturer);
app.get('/car', verifyAdmin, getAllCars);
app.get('/owner/car', verifyUser, getCarsByUser);
app.patch('/car/:id/status', verifyUser, updateCarStatus);
app.patch('/car/:id/price', verifyUser, updateCarPrice);
app.delete('/car/:id', verifyAdmin, deleteCarAd);

// ORDER ROUTES
app.post('/order', verifyUser, makeOrder);
app.patch('/order/:id/price', verifyUser, updateOrderPrice);
app.get('/buyer/order', verifyUser, getOrdersByUser);

export default app;
