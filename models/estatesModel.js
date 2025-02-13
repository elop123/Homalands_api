import sequelize from '../config/sequelizeConfig.js';
import { DataTypes, Model } from 'sequelize';
import { citiesModel } from './citiesModel.js';
import { energy_labelsModel } from './energy_labelsModel.js';
import { estateTypesModel } from './estateTypesModel.js';

export class estatesModel extends Model{}

estatesModel.init({
    id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    payout:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    gross:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    net:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    cost:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    num_rooms:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    num_floors:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    floor_space:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    ground_space:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    basement_space:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    year_construction:{
        type:DataTypes.INTEGER,
        allowNull:false
        
    },
    year_rebuilt:{
        type:DataTypes.INTEGER,
        allowNull:false,
       
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    floorplan:{
        type:DataTypes.STRING,
        allowNull:false
    },
    num_clicks:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    city_id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        references:{
            model:citiesModel,
            key:'id'
        }
    },
    estate_type_id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        references:{
            model:estateTypesModel,
            key:'id'
        }
    },
    energy_label_id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        references:{
            model:energy_labelsModel,
            key:'id'
        }
        
    }
},
    {
        sequelize,
        modelName:"estate",
        underscored:true,
        freezeTableName:false,
        createdAt:true,
        updatedAt:true
    }
)