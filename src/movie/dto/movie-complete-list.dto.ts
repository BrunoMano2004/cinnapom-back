import { MovieDetailDto } from './describe-movie.dto';
import { WatchProvidersBrDto } from './watch-providers-br.dto';

export class ListCompleteMovie {
  movie!: MovieDetailDto;
  providers!: WatchProvidersBrDto;
}
