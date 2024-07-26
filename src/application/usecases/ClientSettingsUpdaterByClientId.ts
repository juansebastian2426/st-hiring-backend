import { ClientSettingsRepository } from '../../domain/respositories/ClientSettingsRepository';
import { ClientSetting } from '../../domain/entities/client-setting';


export class ClientSettingsUpdaterByClientId {
  constructor(
    private readonly repository: ClientSettingsRepository
  ) {}

  async run (clientId: number, data: Partial<ClientSetting>): Promise<ClientSetting> {
    let clientSettingFound = await this.repository.getByClientId(clientId)

    if (!clientSettingFound) {
      throw new Error(`ClientSetting not found: ${clientId}`);
    }
    const mergedData = {
      clientId: data.clientId ?? clientSettingFound.clientId,
      deliveryMethods: data.deliveryMethods ?? clientSettingFound.deliveryMethods,
      fulfillmentFormat: {
        rfid: data.fulfillmentFormat?.rfid ?? clientSettingFound.fulfillmentFormat.rfid,
        print: data.fulfillmentFormat?.print ?? clientSettingFound.fulfillmentFormat.print,
      },
      printer: {
        id: data.printer?.id ?? clientSettingFound.printer?.id,
      },
      printingFormat: {
        formatA: data.printingFormat?.formatA ?? clientSettingFound.printingFormat.formatA,
        formatB: data.printingFormat?.formatB ?? clientSettingFound.printingFormat.formatB,
      },
      scanning: {
        scanManually: data.scanning?.scanManually ?? clientSettingFound.scanning.scanManually,
        scanWhenComplete: data.scanning?.scanWhenComplete ?? clientSettingFound.scanning.scanWhenComplete,
      },
      paymentMethods: {
        cash: data.paymentMethods?.cash ?? clientSettingFound.paymentMethods.cash,
        creditCard: data.paymentMethods?.creditCard ?? clientSettingFound.paymentMethods.creditCard,
        comp: data.paymentMethods?.comp ?? clientSettingFound.paymentMethods.comp,
      },
      ticketDisplay: {
        leftInAllotment: data.ticketDisplay?.leftInAllotment ?? clientSettingFound.ticketDisplay.leftInAllotment,
        soldOut: data.ticketDisplay?.soldOut ?? clientSettingFound.ticketDisplay.soldOut,
      },
      customerInfo: {
        active: data.customerInfo?.active ?? clientSettingFound.customerInfo.active,
        basicInfo: data.customerInfo?.basicInfo ?? clientSettingFound.customerInfo.basicInfo,
        addressInfo: data.customerInfo?.addressInfo ?? clientSettingFound.customerInfo.addressInfo,
      },
    };

    return await this.repository.updateByClientId(clientId, mergedData)
  }
}
