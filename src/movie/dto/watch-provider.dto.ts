import { Expose } from 'class-transformer';

export class WatchProviderDto {
  @Expose({ name: 'logo_path' })
  logoPath!: string;

  @Expose({ name: 'provider_id' })
  providerId!: number;

  @Expose({ name: 'provider_name' })
  providerName!: string;

  @Expose({ name: 'display_priority' })
  displayPriority!: number;
}
