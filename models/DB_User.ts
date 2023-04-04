import { Model } from 'sequelize';

export class DB_User extends Model {
  public id!: string;
  public email!: string;
  public firstName!: string;
  public lastName!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}