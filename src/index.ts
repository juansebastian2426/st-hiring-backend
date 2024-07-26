import express, { Request, Router } from 'express';
import { knex } from 'knex';
import dbConfig  from './knexfile';
import { createEventDAL } from './dal/events.dal';
import { createTicketDAL } from './dal/tickets.dal';
import { createGetEventsController } from './controllers/get-events';
import { MongooseCreateFactory } from './infrastructure/mongoose/MongooseCreateFactory';
import { MongooseClientSettingsRepository } from './infrastructure/persistence/MongooseClientSettingsRepository';
import ClientSettingsModel from './infrastructure/mongoose/EventModel';
import { ClientSettingsGetterByClientId } from './application/usecases/ClientSettingsGetterByClientId';
import { body, param, ValidationChain } from 'express-validator';
import dotenv from 'dotenv';
import { ClientSettingsUpdaterByClientId } from './application/usecases/ClientSettingsUpdaterByClientId';

dotenv.config();

MongooseCreateFactory.create(process.env.MONGODB_URI!)

// initialize Knex
const Knex = knex(dbConfig.development);

// Initialize DALs
const eventDAL = createEventDAL(Knex);
const TicketDAL = createTicketDAL(Knex);


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/events', createGetEventsController({ eventsDAL: eventDAL, ticketsDAL: TicketDAL }));

const clientSettingsRouter = Router()
clientSettingsRouter.get('/:clientId', [
  param('clientId').isInt({
    max: 100
  }).toInt()
], async (req: Request<{ clientId: number }>, res) => {
  const { clientId } = req.params;
  const repository = new MongooseClientSettingsRepository(ClientSettingsModel)
  const service = new ClientSettingsGetterByClientId(repository)

  const settings = await service.run(clientId)

  res.json(settings)
})

const clientSettingsValidationRulesUpdate: ValidationChain[] = [
  param('clientId').isInt({
    max: 100
  }).toInt(),
  body('deliveryMethods').optional().isArray().withMessage('deliveryMethods must be an array'),
  body('deliveryMethods.*.name').optional().isString().withMessage('Delivery method name must be a string'),
  body('deliveryMethods.*.enum').optional().isIn(['PRINT_NOW', 'PRINT_AT_HOME', 'PHYSICAL_DELIVERY']).withMessage('Invalid enum value'),
  body('deliveryMethods.*.order').optional().isInt().withMessage('Delivery method order must be an integer'),
  body('deliveryMethods.*.isDefault').optional().isBoolean().withMessage('isDefault must be a boolean'),
  body('deliveryMethods.*.selected').optional().isBoolean().withMessage('selected must be a boolean'),
  body('fulfillmentFormat.rfid').optional().isBoolean().withMessage('rfid must be a boolean'),
  body('fulfillmentFormat.print').optional().isBoolean().withMessage('print must be a boolean'),
  body('printer.id').optional().isInt().withMessage('Printer ID must be an integer'),
  body('printingFormat.formatA').optional().isBoolean().withMessage('formatA must be a boolean'),
  body('printingFormat.formatB').optional().isBoolean().withMessage('formatB must be a boolean'),
  body('scanning.scanManually').optional().isBoolean().withMessage('scanManually must be a boolean'),
  body('scanning.scanWhenComplete').optional().isBoolean().withMessage('scanWhenComplete must be a boolean'),
  body('paymentMethods.cash').optional().isBoolean().withMessage('cash must be a boolean'),
  body('paymentMethods.creditCard').optional().isBoolean().withMessage('creditCard must be a boolean'),
  body('paymentMethods.comp').optional().isBoolean().withMessage('comp must be a boolean'),
  body('ticketDisplay.leftInAllotment').optional().isBoolean().withMessage('leftInAllotment must be a boolean'),
  body('ticketDisplay.soldOut').optional().isBoolean().withMessage('soldOut must be a boolean'),
  body('customerInfo.active').optional().isBoolean().withMessage('active must be a boolean'),
  body('customerInfo.basicInfo').optional().isBoolean().withMessage('basicInfo must be a boolean'),
  body('customerInfo.addressInfo').optional().isBoolean().withMessage('addressInfo must be a boolean')
];
clientSettingsRouter.put('/:clientId', clientSettingsValidationRulesUpdate, async (req: Request<{ clientId: number }>, res) => {
  const { clientId } = req.params;
  const repository = new MongooseClientSettingsRepository(ClientSettingsModel)
  const service = new ClientSettingsUpdaterByClientId(repository)
  console.log(req.body)
  const settings = await service.run(clientId, req.body)

  res.json(settings)
})

app.use('/client-settings', clientSettingsRouter)


app.use('/', (_req, res) => {
  res.json({ message: 'Hello API' });
});

app.listen(3000, () => {
  console.log('Server Started')
});
