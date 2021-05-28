const {
  DataTypes
} = require( 'sequelize' );
const bcrypt = require( 'bcrypt' );


module.exports = ( sequelize ) => {
  const User = sequelize.define( 'User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please provide a first name.",
        },
        notNull: {
          msg: 'Please provide a first name',
        },
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please provide last name.",
        },
        notNull: {
          msg: 'Please provide a last name',
        },
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Username / email already registered'
      },
      validate: {
        isEmail: {
          msg: "Please provide a valid email address.",
        },
        notEmpty: {
          msg: "Please don't leave the email field empty"
        },
        notNull: {
          msg: 'Please provide a email address',
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please provide a password.",
        },
        notNull: {
          msg: 'Please provide a password',
        }
      },
      set( value ) {
        //storing the passwords hashed for more protection.
        if ( value !== "" ) {
          this.setDataValue( 'password', bcrypt.hashSync( value, 10 ) );
        }
      }
    }
  }, {
    sequelize
  } );
  User.associate = ( models ) => {
    User.hasMany( models.Course, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      }
    } );
  };
  return User;
}