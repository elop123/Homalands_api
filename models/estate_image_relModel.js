import sequelize from '../config/sequelizeConfig.js';
import { DataTypes, Model } from 'sequelize';

export class estate_image_relModel extends Model{}

estate_image_relModel.init({
    id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true
    },
    estate_id:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    image_id:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    is_main:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
},
    {
        sequelize,
        modelName:"estate_image_rel",
        underscored:true,
        freezeTableName:false,
        createdAt:true,
        updatedAt:true
    }
)