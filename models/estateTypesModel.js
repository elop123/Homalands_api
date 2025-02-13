import sequelize from '../config/sequelizeConfig.js';
import { DataTypes, Model } from 'sequelize';

export class estateTypesModel extends Model{}

estateTypesModel.init({
    id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
    {
        sequelize,
        modelName:"estate_type",
        underscored:true,
        freezeTableName:false,
        createdAt:true,
        updatedAt:true
    }
)