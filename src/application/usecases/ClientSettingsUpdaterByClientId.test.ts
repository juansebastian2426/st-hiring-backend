import { ClientSetting } from '../../domain/entities/client-setting';
import { ClientSettingsUpdaterByClientId } from './ClientSettingsUpdaterByClientId';

let service: ClientSettingsUpdaterByClientId;
const repository = {
  getByClientId: jest.fn(),
  updateByClientId: jest.fn(),
  create: jest.fn(),
}

beforeEach(() => {
  service = new ClientSettingsUpdaterByClientId(repository)
})

describe('ClientSettingsUpdaterByClientId', () => {

  it ('should update correctly', async () => {
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


    const dataToUpdate = {
      printer: {
        id: 2425
      }
    }
    repository.updateByClientId.mockResolvedValueOnce({
      ...mockSetting,
      ...dataToUpdate
    })

    const settings = await service.run(mockSetting.clientId, dataToUpdate)

    expect(settings).toEqual({
      ...mockSetting,
      ...dataToUpdate
    })
  })

  it ('should throw error when setting not found', async () => {
    repository.getByClientId.mockResolvedValueOnce(null)

    const clientId = 4000
    await expect(service.run(clientId, {})).rejects.toThrow(`ClientSetting not found: ${clientId}`)
  })
})
