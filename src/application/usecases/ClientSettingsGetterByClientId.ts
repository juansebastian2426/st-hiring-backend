import { ClientSettingsRepository } from '../../domain/respositories/ClientSettingsRepository';
import { ClientSetting } from '../../domain/entities/client-setting';

export class ClientSettingsGetterByClientId {
  constructor(
    private readonly repository: ClientSettingsRepository
  ) {}

  async run (clientId: number): Promise<ClientSetting> {
    let clientSettingFound = await this.repository.getByClientId(clientId)

    if (!clientSettingFound) {
      clientSettingFound = await this.repository.create(ClientSetting.createDefault(clientId))
    }

    return clientSettingFound
  }
}
