const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging:false
});

const orders = sequelize.define('orders', {
    id : {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    order_date:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    status:{
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'pending'
    },
}, 
{
    tableName: 'orders'
}
);
module.exports = { orders };
