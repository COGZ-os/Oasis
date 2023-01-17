// const { Pool } = require('pg');
const dotenv = require('dotenv');

const { PGURI } = process.env;
const PG_URI = PGURI;

// // create a new pool here using the connection string above
// const pool = new Pool({
//   connectionString: PG_URI
// });

// // Adding some notes about the database here will be helpful for future you or other developers.
// // Schema for the database can be found below:
// // https://github.com/CodesmithLLC/unit-10SB-databases/blob/master/docs/assets/images/schema.png

// // We export an object that contains a property called query,
// // which is a function that returns the invocation of pool.query() after logging the query
// // This will be required in the controllers to be the access point to the database
// module.exports = {
//   query: (text, params, callback) => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback);
//   }
// };

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(PG_URI);

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
});

const Location = sequelize.define('Location', {
  //id
  // creator_id
  // name
  // location_category
  // lgbtq_category
  // address_street
  // address_city
  // address_state
  // address_zipcode
  // safe_yes_votes
  // safe_no_votes
  // description
  // lat
  // lng
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location_category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lgbtq_category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_zipcode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  safe_yes_votes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  safe_no_votes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  location_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Location,
      key: 'id'
    }
  },
});

User.hasMany(Location);
Location.belongsTo(User);

User.belongsToMany(Location, { through: Favorite });
Location.belongsToMany(User, { through: Favorite });

sequelize.sync();

async function auth() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  auth, User, Location, Favorite, sequelize,
};