import { Nullable } from '../Nullable';
import { ClientSetting } from '../entities/client-setting';

export interface ClientSettingsRepository {
  getByClientId(clientId: number): Promise<Nullable<ClientSetting>>;

  updateByClientId(clientId: number, data: Partial<ClientSetting>): Promise<ClientSetting>

  create (data: ClientSetting): Promise<ClientSetting>
}
