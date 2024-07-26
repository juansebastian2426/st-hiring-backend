import { ClientSettingsRepository } from '../../domain/respositories/ClientSettingsRepository';
import ClientSettingsModel from '../mongoose/EventModel';
import { Nullable } from '../../domain/Nullable';
import { ClientSetting, IClientSettings } from '../../domain/entities/client-setting';
import { Document, Types } from 'mongoose';

export class MongooseClientSettingsRepository implements ClientSettingsRepository {
  constructor(private readonly client: typeof ClientSettingsModel) {}

  async getByClientId(clientId: number): Promise<Nullable<ClientSetting>> {
    const response = await this.client.findOne({ clientId }).exec();

    return response ? this.toEntity(response) : null
  }

  async create (client: ClientSetting): Promise<ClientSetting> {
    const newClientSettings = new ClientSettingsModel(client);
    const response = await newClientSettings.save();

    return this.toEntity(response)
  }

  async updateByClientId(clientId: number, data: Partial<ClientSetting>): Promise<ClientSetting> {
    const response = await ClientSettingsModel.findOneAndUpdate(
      { clientId },
      { $set: data },
      { new: true }
    ).exec();

    return this.toEntity(response)
  }

  toEntity (data:  Document<unknown, {}, IClientSettings> & IClientSettings & { _id: Types.ObjectId }): ClientSetting {
    return new ClientSetting({
      clientId: data.clientId,
      customerInfo: {
        active: data.customerInfo.active,
        basicInfo: data.customerInfo.basicInfo,
        addressInfo: data.customerInfo.addressInfo
      },
      deliveryMethods: data.deliveryMethods.map(item => ({
        name: item.name,
        order: item.order,
        enum: item.enum,
        selected: item.selected,
        isDefault: item.isDefault,
      })),
      fulfillmentFormat: {
        rfid: data.fulfillmentFormat.rfid,
        print: data.fulfillmentFormat.print
      },
      printer: {
        id: data.printer.id
      },
      paymentMethods: {
        cash: data.paymentMethods.cash,
        comp: data.paymentMethods.comp,
        creditCard: data.paymentMethods.creditCard
      },
      printingFormat: {
        formatA: data.printingFormat.formatA,
        formatB: data.printingFormat.formatB
      },
      scanning: {
        scanManually: data.scanning.scanManually,
        scanWhenComplete: data.scanning.scanWhenComplete
      },
      ticketDisplay: {
        leftInAllotment: data.ticketDisplay.leftInAllotment,
        soldOut: data.ticketDisplay.soldOut
      }
    })
  }
}
