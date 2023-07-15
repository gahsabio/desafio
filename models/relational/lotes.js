/** 
 * @author: Gabriel de Freita Santos Sábio
 * @date: 12/07/2023
 * @desc: methods for fetching mysql data
 * Extraído de https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
 */


 module.exports = (sequelize, DataTypes) => {
    
    const lotes = sequelize.pool.define('lotes', {
        id: {
          type:          DataTypes.INTEGER,
          autoIncrement: true,
          allowNull:     false,
          primaryKey:    true
        },

        nome:  {
          type:          DataTypes.STRING(100),
          allowNull:     true
        },

        ativo:  {
          type:          DataTypes.BOOLEAN,
          allowNull:     true
        },

        criado_em: {
          type: 'TIMESTAMP',
          defaultValue: sequelize.pool.literal('CURRENT_TIMESTAMP'),
          allowNull: true
        },
        
        atualizado_em: {
          type: 'TIMESTAMP',
          defaultValue: sequelize.pool.literal('CURRENT_TIMESTAMP'),
          allowNull: true
        }
  
    }, 
    {
        freezeTableName: true,
        tableName: 'lotes',
        timestamps:      false
    })

    return lotes
}