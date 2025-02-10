import sequelize from '../config/sequelizeConfig.js';
import { DataTypes, Model } from 'sequelize';

export class staffsModel extends Model{}

staffsModel.init({
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
    position:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
},
    {
        sequelize,
        modelName:"staffs",
        underscored:true,
        freezeTableName:false,
        createdAt:true,
        updatedAt:true
    }
)