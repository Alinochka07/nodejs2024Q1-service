import { EntityRepository, Repository } from 'typeorm';
import { ArtistEntity } from './artist.entity';

@EntityRepository(ArtistEntity)
export class ArtistEntityRepository extends Repository<ArtistEntity> {}
