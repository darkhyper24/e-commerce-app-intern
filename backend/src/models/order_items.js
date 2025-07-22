const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging:false
});

const order_items = sequelize.define('order_items', {
    id:{
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    order_id:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id'
        }
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
{
    tableName: 'order_items',
    timestamps: false
}
);
module.exports = { order_items };