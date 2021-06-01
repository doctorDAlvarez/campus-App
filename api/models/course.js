const {
    DataTypes
  } = require( 'sequelize' );
  

  module.exports = ( sequelize ) => {
    // model attributes
    const Course = sequelize.define( 'Course', {
    //   id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true
    //   },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Provide a course title.'
          },
          notNull: {
            msg: 'Provide a course title.'
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a course description.'
          },
          notNull: {
            msg: 'Provide a description.'
          }
        }
      },
      estimatedTime: {
        type: DataTypes.STRING
      },
      materialsNeeded: {
        type: DataTypes.STRING
      },
    }, {
      sequelize
    } );
    Course.associate = ( models ) => {
      Course.belongsTo( models.User, {
        foreignKey: {
          fieldName: 'userId',
          allowNull: false,
        }
      } );
    };
    return Course;
  }