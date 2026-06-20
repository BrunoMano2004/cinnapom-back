import { Expose, Type } from 'class-transformer';
import { WatchProvidersBrDto } from './watch-providers-br.dto';

class WatchProvidersResultsDto {
  @Expose()
  @Type(() => WatchProvidersBrDto)
  BR?: WatchProvidersBrDto;
}

export class MovieWatchProvidersResponseDto {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => WatchProvidersResultsDto)
  results!: WatchProvidersResultsDto;
}
