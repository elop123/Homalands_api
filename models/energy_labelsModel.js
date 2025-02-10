import sequelize from '../config/sequelizeConfig.js';
import { DataTypes, Model } from 'sequelize';

export class energy_labelsModel extends Model{}

energy_labelsModel.init({
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
        modelName:"energy_labels",
        underscored:true,
        freezeTableName:false,
        createdAt:true,
        updatedAt:true
    }
)