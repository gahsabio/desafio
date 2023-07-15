/** 
 * @author: Gabriel de Freita Santos Sábio
 * @date: 12/07/2023
 * @desc: methods for fetching mysql data
 * Extraído de https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
 */


 module.exports = (sequelize, DataTypes) => {
    
    const boletos = sequelize.pool.define('boletos', {
        id: {
          type:          DataTypes.INTEGER,
          autoIncrement: true,
          allowNull:     false,
          primaryKey:    true
        },

        nome_sacado:  {
          type:          DataTypes.STRING(255),
          allowNull:     true
        },

        id_lote: {
            type: DataTypes.INTEGER,
            allowNull:     false,
            references: {
              model: 'lotes',
              key: 'id'
            } 
        },

        valor:  {
          type:          DataTypes.DECIMAL(10,2),
          allowNull:     true
        },

        linha_digitavel:  {
          type:          DataTypes.STRING(255),
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
        tableName: 'boletos',
        timestamps:      false
    })

    return boletos
}