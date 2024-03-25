import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'UUID v4',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  id: string;

  @Column()
  @ApiProperty({ description: 'Track name', example: 'Hey Jude' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'UUID v4 [Ref to Artist]',
    example: '550e8400-e29b-41d4-a716-446655440001',
    nullable: true,
  })
  @IsOptional()
  artistId: string | null;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'UUID v4 [Ref to Album]',
    example: '550e8400-e29b-41d4-a716-446655440003',
    nullable: true,
  })
  @IsOptional()
  albumId: string | null;

  @Column()
  @ApiProperty({
    description: 'Duration in seconds',
    example: 300,
    type: 'integer',
  })
  @IsNotEmpty()
  @IsInt()
  duration: number;
}

// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { User } from 'src/users/user.entity';
// import { AlbumEntity } from 'src/albums/album.entity';
// import { ArtistEntity } from 'src/artists/artist.entity';

// @Entity()
// export class TrackEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ApiProperty({
//     description: 'Track name',
//     example: 'Hey Jude',
//   })
//   name: string;

//   @ApiProperty({
//     description: 'UUID v4 [Ref to Artist]',
//     example: '550e8400-e29b-41d4-a716-446655440001',
//     nullable: true,
//   })
//   artistId: string | null;

//   @ApiProperty({
//     description: 'UUID v4 [Ref to Album]',
//     example: '550e8400-e29b-41d4-a716-446655440003',
//     nullable: true,
//   })
//   albumId: string | null;

//   @ApiProperty({
//     description: 'Duration in seconds',
//     example: 300,
//     type: 'integer',
//   })
//   duration: number;

//   @ManyToOne(() => User, (user) => user.tracks, { lazy: true })
//   @ApiProperty({ enum: () => User })
//   user: User;
// }
