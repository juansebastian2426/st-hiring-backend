import { ClientSettingsGetterByClientId } from './ClientSettingsGetterByClientId';
import { ClientSetting } from '../../domain/entities/client-setting';

let service: ClientSettingsGetterByClientId;
const repository = {
  getByClientId: jest.fn(),
  updateByClientId: jest.fn(),
  create: jest.fn(),
}

beforeEach(() => {
  service = new ClientSettingsGetterByClientId(repository)
})

describe('ClientSettingsGetterByClientId', () => {

  it ('should return the correct value for client id', async () => {
    const mockSetting = ClientSetting.create({
      clientId: 12345,
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
    repository.getByClientId.mockResolvedValueOnce(mockSetting)

    const settings = await service.run(mockSetting.clientId)

    expect(settings).toEqual(mockSetting)
  })

  it ('should return the default settings when the client settings not found', async () => {
    repository.getByClientId.mockResolvedValueOnce(null)
    const mockSetting = ClientSetting.create({
      clientId: 12345,
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
    repository.create.mockResolvedValueOnce(mockSetting)

    const settings = await service.run(mockSetting.clientId)

    expect(settings).toEqual(mockSetting)
  })
})
