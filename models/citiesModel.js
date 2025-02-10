import sequelize from '../config/sequelizeConfig.js';
import { DataTypes, Model } from 'sequelize';

export class citiesModel extends Model{}

citiesModel.init({
    id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    zipcode:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
},
    {
        sequelize,
        modelName:"cities",
        underscored:true,
        freezeTableName:false,
        createdAt:true,
        updatedAt:true
    }
)