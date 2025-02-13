import sequelize from '../config/sequelizeConfig.js';
import { DataTypes, Model } from 'sequelize';
import { estatesModel } from './estatesModel.js';
import { usersModel } from './usersModel.js';

export class reviewsModel extends Model{}

reviewsModel.init({
    id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true
    },
    subject:{
        type:DataTypes.STRING,
        allowNull:false
    },
    comment:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    num_stars:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    estate_id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        references:{
            model:estatesModel,
            key:'id'
        }
    },
    user_id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        references:{
            model:usersModel,
            key:'id'
        }
    },
    is_active:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
},
    {
        sequelize,
        modelName:"reviews",
        underscored:true,
        freezeTableName:false,
        createdAt:true,
        updatedAt:true
    }
)