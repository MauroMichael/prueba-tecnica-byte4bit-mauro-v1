import Sequelize from 'sequelize';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env
let	sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
			logging: false
		})

const connection = sequelize;

// connection.sync({alter: true});  //to add new changes

export default connection;
