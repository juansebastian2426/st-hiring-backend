import mongoose, { Schema } from 'mongoose';
import { IClientSettings } from '../../domain/entities/client-setting';

const clientSettingsSchema = new Schema<IClientSettings>({
  clientId: { type: Number, required: true, unique: true },
  deliveryMethods: [{
    name: { type: String, required: true },
    enum: { type: String, enum: ["PRINT_NOW", "PRINT_AT_HOME", "PHYSICAL_DELIVERY"], required: true },
    order: { type: Number, required: true },
    isDefault: { type: Boolean, required: true },
    selected: { type: Boolean, required: true },
  }],
  fulfillmentFormat: {
    rfid: { type: Boolean, required: true },
    print: { type: Boolean, required: true },
  },
  printer: {
    id: Number,
  },
  printingFormat: {
    formatA: { type: Boolean, required: true },
    formatB: { type: Boolean, required: true },
  },
  scanning: {
    scanManually: { type: Boolean, required: true },
    scanWhenComplete: { type: Boolean, required: true },
  },
  paymentMethods: {
    cash: { type: Boolean, required: true },
    creditCard: { type: Boolean, required: true },
    comp: { type: Boolean, required: true },
  },
  ticketDisplay: {
    leftInAllotment: { type: Boolean, required: true },
    soldOut: { type: Boolean, required: true },
  },
  customerInfo: {
    active: { type: Boolean, required: true },
    basicInfo: { type: Boolean, required: true },
    addressInfo: { type: Boolean, required: true },
  },
});

const ClientSettingsModel = mongoose.model<IClientSettings>('ClientSettings', clientSettingsSchema);

export default ClientSettingsModel;
