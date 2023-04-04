import { Sequelize, DataTypes } from 'sequelize';
import { DB_User } from "./models/DB_User";

let database: Sequelize | undefined = undefined;

export const createNewDbConnection = async() => {
  const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER_NAME!, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
  });

  return sequelize;
};

export const initDbSchema = async () => {
  if(database === undefined) {
    console.log('Establishing a new DB connection...');
    database = await createNewDbConnection();
    console.log('new DB connection established');
  } else {
    console.log('DB Connection is already established... Checking if the connection is still valid...')
  }

  try {
    console.log('authenticating to DB...');
    await database.authenticate();
    console.log('connected to DB');
  } catch(err) {
    console.log(`DB connection is not valid: ${err}`);
    console.log('Attempting to establish new DB connection');
    database = await createNewDbConnection();

    try {
      await database.authenticate();
      console.log('connected to DB after re-establishing connection');
    } catch(errInternal) {
      const errorMessage = `Unable to connect to DB: ${errInternal}`;
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }

  DB_User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
  }, {
    tableName: 'User',
    sequelize: database,
  });

  return database;
}