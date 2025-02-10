import sequelize from '../config/sequelizeConfig.js';
import { DataTypes, Model } from 'sequelize';

export class usersModel extends Model{}

usersModel.init({
    id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true
    },
    firstname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    refresh_token:{
        type:DataTypes.STRING,
        allowNull:false
    },
    is_active:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
},
    {
        sequelize,
        modelName:"users",
        underscored:true,
        freezeTableName:false,
        createdAt:true,
        updatedAt:true
    }
)