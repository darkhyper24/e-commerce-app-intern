const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging:false
});
const cart_items = sequelize.define('cart_items', {
    id:{
        type:DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true
    },
    user_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    product_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references: {
            model: 'products',
            key: 'id'
        }
    },quantity:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    added_at:{
        type:DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
},
{
    tableName: 'cart_items',
    timestamps: false

}
);
module.exports = { cart_items };