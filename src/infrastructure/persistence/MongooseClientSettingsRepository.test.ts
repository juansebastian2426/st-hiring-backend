import { MongooseClientSettingsRepository } from './MongooseClientSettingsRepository';
import ClientSettingsModel from '../mongoose/EventModel';
import { ClientSetting } from '../../domain/entities/client-setting';
import { MongooseCreateFactory } from '../mongoose/MongooseCreateFactory';
import { faker } from '@faker-js/faker';

beforeAll(async () => {
  await MongooseCreateFactory.create('mongodb://root:example@localhost:27018/')
})

describe('MongooseClientSettingsRepository', () => {
  describe('getByClientId', () => {
    it ('should return correctly the client settings', async () => {
      const repository = new MongooseClientSettingsRepository(ClientSettingsModel)

      const mockSetting = ClientSetting.create({
        clientId: faker.number.int({
          max: 1000
        }),
        deliveryMethods: [
          {
            name: "Will Call",
            enum: "PRINT_NOW",
            order: 1,
            isDefault: true,
            selected: true,
          },
          {
            name: "Correo electrónico",
            enum: "PRINT_AT_HOME",
            order: 2,
            isDefault: false,
            selected: false,
          },
        ],
        fulfillmentFormat: {
          rfid: true,
          print: true,
        },
        printer: {
          id: 9876,
        },
        printingFormat: {
          formatA: true,
          formatB: false,
        },
        scanning: {
          scanManually: false,
          scanWhenComplete: true,
        },
        paymentMethods: {
          cash: true,
          creditCard: true,
          comp: false,
        },
        ticketDisplay: {
          leftInAllotment: true,
          soldOut: false,
        },
        customerInfo: {
          active: true,
          basicInfo: true,
          addressInfo: true,
        },
      })
      await repository.create(mockSetting)

      const response = await repository.getByClientId(mockSetting.clientId)

      expect(response).toEqual(response)
    })
  });

  describe('updateByClientId', () => {
    it ('should return correctly the client settings', async () => {
      const repository = new MongooseClientSettingsRepository(ClientSettingsModel)
      const mockSetting = ClientSetting.create({
        clientId: faker.number.int({
          max: 1000
        }),
        deliveryMethods: [
          {
            name: "Will Call",
            enum: "PRINT_NOW",
            order: 1,
            isDefault: true,
            selected: true,
          },
          {
            name: "Correo electrónico",
            enum: "PRINT_AT_HOME",
            order: 2,
            isDefault: false,
            selected: false,
          },
        ],
        fulfillmentFormat: {
          rfid: true,
          print: true,
        },
        printer: {
          id: 9876,
        },
        printingFormat: {
          formatA: true,
          formatB: false,
        },
        scanning: {
          scanManually: false,
          scanWhenComplete: true,
        },
        paymentMethods: {
          cash: true,
          creditCard: true,
          comp: false,
        },
        ticketDisplay: {
          leftInAllotment: true,
          soldOut: false,
        },
        customerInfo: {
          active: true,
          basicInfo: true,
          addressInfo: true,
        },
      })
      await repository.create(mockSetting)

      const dataToUpdate = {
        printer: {
          id: 2425
        }
      }
      const response = await repository.updateByClientId(mockSetting.clientId, dataToUpdate)

      expect(response).toEqual({
        ...mockSetting,
        ...dataToUpdate
      })
    })
  })

  describe('create', () => {
    it ('should create', async () => {
      const repository = new MongooseClientSettingsRepository(ClientSettingsModel)

      const mockSetting = ClientSetting.create({
        clientId: faker.number.int({
          max: 1000
        }),
        deliveryMethods: [
          {
            name: "Will Call",
            enum: "PRINT_NOW",
            order: 1,
            isDefault: true,
            selected: true,
          },
          {
            name: "Correo electrónico",
            enum: "PRINT_AT_HOME",
            order: 2,
            isDefault: false,
            selected: false,
          },
        ],
        fulfillmentFormat: {
          rfid: true,
          print: true,
        },
        printer: {
          id: 9876,
        },
        printingFormat: {
          formatA: true,
          formatB: false,
        },
        scanning: {
          scanManually: false,
          scanWhenComplete: true,
        },
        paymentMethods: {
          cash: true,
          creditCard: true,
          comp: false,
        },
        ticketDisplay: {
          leftInAllotment: true,
          soldOut: false,
        },
        customerInfo: {
          active: true,
          basicInfo: true,
          addressInfo: true,
        },
      })
      const response = await repository.create(mockSetting)

      expect(response).toEqual(response)
    })
  })
});
