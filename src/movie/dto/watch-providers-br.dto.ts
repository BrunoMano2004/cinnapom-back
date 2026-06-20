import { Expose, Type } from 'class-transformer';
import { WatchProviderDto } from './watch-provider.dto';

export class WatchProvidersBrDto {
  @Expose()
  link!: string;

  @Expose()
  @Type(() => WatchProviderDto)
  flatrate?: WatchProviderDto[];

  @Expose()
  @Type(() => WatchProviderDto)
  rent?: WatchProviderDto[];

  @Expose()
  @Type(() => WatchProviderDto)
  buy?: WatchProviderDto[];

  @Expose()
  @Type(() => WatchProviderDto)
  ads?: WatchProviderDto[];
}
