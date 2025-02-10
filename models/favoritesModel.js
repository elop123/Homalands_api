import sequelize from '../config/sequelizeConfig.js';
import { DataTypes, Model } from 'sequelize';

export class favoritesModel extends Model{}

favoritesModel.init({
    id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true
    },
    user_id:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estate_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
},
    {
        sequelize,
        modelName:"favorites",
        underscored:true,
        freezeTableName:false,
        createdAt:true,
        updatedAt:true
    }
)