import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.entity';
import { ManyToOne } from 'typeorm';

export class Album {
  @ApiProperty({
    description: 'UUID v4',
    example: '485464fe-4c01-4734-b735-b0664f69bb6a',
  })
  id: string;

  @ApiProperty({ description: 'Album name', example: 'My Album' })
  name: string;

  @ApiProperty({ description: 'Description to Album', example: 2010 })
  year: number;

  @ApiProperty({
    description: 'UUID v4 [Ref to Artist]',
    example: '485464fe-4c01-4734-b735-b0664f69bb6a',
    nullable: true,
  })
  artistId: string | null;

  @ManyToOne(() => User, { lazy: true })
  user: User;
}
