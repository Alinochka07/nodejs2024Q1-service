import { EntityRepository, Repository } from 'typeorm';
import { TrackEntity } from './track.entity';

@EntityRepository(TrackEntity)
export class TrackEntityRepository extends Repository<TrackEntity> {}
