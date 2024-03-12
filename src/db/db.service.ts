import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Album, Artist, Track, User } from './db.models';
import { CreateUserDto, GetUserDto } from '../users/dto';
import { CreateAlbumDto } from '../albums/dto';

@Injectable()
export class DatabaseService {
  private users: Map<string, User>;
  private artists: Map<string, Artist>;
  private albums: Map<string, Album>;
  private tracks: Map<string, Track>;
  private favorites = {
    artists: new Map(),
    albums: new Map(),
    tracks: new Map(),
  };

  constructor() {
    this.users = new Map();
    this.tracks = new Map();
    this.artists = new Map();
    this.albums = new Map();
  }

  // users
  public async createUser(dto: CreateUserDto): Promise<User> {
    const uuid = randomUUID();
    const timestamp = new Date().getTime();

    const user: User = {
      ...dto,
      id: uuid,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.users.set(uuid, user);

    return user;
  }

  public async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  public async getAllUsers(): Promise<User[]> {
    return [...this.users.values()];
  }

  public async updateUser(id: string, dto: GetUserDto): Promise<User> {
    const updatedUser: User = {
      ...dto,
      version: dto.version + 1,
      updatedAt: new Date().getTime(),
    };

    this.users.set(id, updatedUser);

    return updatedUser;
  }

  public async removeUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  // albums
  public async createAlbum(dto: CreateAlbumDto): Promise<Album> {
    const uuid = randomUUID();

    const album: Album = {
      ...dto,
      id: uuid,
    };

    this.albums.set(uuid, album);

    return album;
  }

  public async getAlbum(id: string): Promise<Album | undefined> {
    return this.albums.get(id);
  }

  public async getAllAlbums(): Promise<Album[]> {
    return [...this.albums.values()];
  }

  public async updateAlbum(
    id: string,
    dto: CreateAlbumDto,
  ): Promise<Album | null> {
    const album = this.albums.get(id);

    if (!album) {
      return null;
    }

    const updatedAlbum: Album = {
      ...album,
      ...dto,
    };

    this.albums.set(id, updatedAlbum);

    return updatedAlbum;
  }

  public async removeAlbum(id: string): Promise<boolean> {
    const res = this.albums.delete(id);

    if (res) {
      this.favorites.albums.delete(id);

      [...this.tracks.values()].forEach((track) => {
        if (track.albumId === id) {
          const updatedTrack: Track = {
            ...track,
            albumId: null,
          };

          this.tracks.set(track.id, updatedTrack);
        }
      });
    }

    return res;
  }

  //   // favorites
  //   public async getFavorites() {
  //     return Object.keys(this.favorites).reduce((obj, key) => {
  //       obj[key] = [...this.favorites?.[key]?.keys()]?.reduce((acc, id) => {
  //         if (this?.[key]?.has(id)) {
  //           acc.push(this[key].get(id));
  //         }

  //         return acc;
  //       }, []);

  //       return obj;
  //     }, {});
  //   }

  //   public async addFavorite(
  //     type: FavoriteEntityType,
  //     id: string,
  //   ): Promise<string | null> {
  //     switch (type) {
  //       case 'album':
  //         if (this.albums.has(id)) {
  //           this.favorites.albums.set(id, type);

  //           return id;
  //         }

  //         return null;
  //       case 'artist':
  //         if (this.artists.has(id)) {
  //           this.favorites.artists.set(id, type);

  //           return id;
  //         }

  //         return null;
  //       case 'track':
  //         if (this.tracks.has(id)) {
  //           this.favorites.tracks.set(id, type);

  //           return id;
  //         }

  //         return null;
  //       default:
  //         return null;
  //     }
  //   }

  //   public async removeFavorite(
  //     type: FavoriteEntityType,
  //     id: string,
  //   ): Promise<boolean> {
  //     switch (type) {
  //       case 'album':
  //         return this.favorites.albums.delete(id);
  //       case 'artist':
  //         return this.favorites.artists.delete(id);
  //       case 'track':
  //         return this.favorites.tracks.delete(id);
  //       default:
  //         return false;
  //     }
  //}
}
