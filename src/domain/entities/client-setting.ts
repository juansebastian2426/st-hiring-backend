export interface IClientSettings {
  clientId: number;
  deliveryMethods: {
    name: string;
    enum: "PRINT_NOW" | "PRINT_AT_HOME";
    order: number;
    isDefault: boolean;
    selected: boolean;
  }[];
  fulfillmentFormat: {
    rfid: boolean;
    print: boolean;
  };
  printer: {
    id: number | null;
  };
  printingFormat: {
    formatA: boolean;
    formatB: boolean;
  };
  scanning: {
    scanManually: boolean;
    scanWhenComplete: boolean;
  };
  paymentMethods: {
    cash: boolean;
    creditCard: boolean;
    comp: boolean;
  };
  ticketDisplay: {
    leftInAllotment: boolean;
    soldOut: boolean;
  };
  customerInfo: {
    active: boolean;
    basicInfo: boolean;
    addressInfo: boolean;
  };
}

export class ClientSetting {
  readonly clientId: number;
  readonly deliveryMethods: {
    name: string;
    enum: "PRINT_NOW" | "PRINT_AT_HOME";
    order: number;
    isDefault: boolean;
    selected: boolean;
  }[]
  readonly fulfillmentFormat: {
    rfid: boolean;
    print: boolean;
  }
  readonly printer: {
    id: number | null;
  }
  readonly printingFormat: {
    formatA: boolean;
    formatB: boolean;
  }
  readonly scanning: {
    scanManually: boolean;
    scanWhenComplete: boolean;
  }
  readonly paymentMethods: {
    cash: boolean;
    creditCard: boolean;
    comp: boolean;
  }
  readonly ticketDisplay: {
    leftInAllotment: boolean;
    soldOut: boolean;
  }
  readonly customerInfo: {
    active: boolean;
    basicInfo: boolean;
    addressInfo: boolean;
  }

  constructor(params: IClientSettings) {
    this.clientId = params.clientId;
    this.deliveryMethods = params.deliveryMethods;
    this.fulfillmentFormat = params.fulfillmentFormat;
    this.printer = params.printer;
    this.printingFormat = params.printingFormat;
    this.scanning = params.scanning;
    this.paymentMethods = params.paymentMethods;
    this.ticketDisplay = params.ticketDisplay;
    this.customerInfo = params.customerInfo;
  }

  static create (params: IClientSettings): ClientSetting {
    // to use in case we use domain events
    return new ClientSetting(params);
  }

  static createDefault(clientId: number): ClientSetting {
    const defaultClientSettings: ClientSetting = {
      clientId,
      deliveryMethods: [
        {
          name: "Print Now",
          enum: "PRINT_NOW",
          order: 1,
          isDefault: true,
          selected: true,
        },
        {
          name: "Print@Home",
          enum: "PRINT_AT_HOME",
          order: 2,
          isDefault: false,
          selected: false,
        },
      ],
      fulfillmentFormat: {
        rfid: false,
        print: true,
      },
      printer: {
        id: null,
      },
      printingFormat: {
        formatA: true,
        formatB: false,
      },
      scanning: {
        scanManually: true,
        scanWhenComplete: false,
      },
      paymentMethods: {
        cash: true,
        creditCard: false,
        comp: false,
      },
      ticketDisplay: {
        leftInAllotment: true,
        soldOut: false,
      },
      customerInfo: {
        active: false,
        basicInfo: true,
        addressInfo: false,
      },
    };
    return ClientSetting.create(defaultClientSettings)
  }
}
