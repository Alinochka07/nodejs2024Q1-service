import { EntityRepository, Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';

@EntityRepository(AlbumEntity)
export class AlbumEntityRepository extends Repository<AlbumEntity> {}
