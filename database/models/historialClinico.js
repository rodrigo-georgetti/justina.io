"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HistorialClinico extends Model {
    static associate(models) {
      HistorialClinico.belongsTo(models.Pacientes, {
        as: "Paciente",
        foreignKey: "pacientesId",
      });
      HistorialClinico.belongsTo(models.Tratamientos, {
        as: "Tratamiento",
        foreignKey: "tratamientosId",
      });
    }
  }
  HistorialClinico.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      pacientesId: { type: DataTypes.INTEGER, allowNull: false },
      tratamientosId: { type: DataTypes.INTEGER, allowNull: false },
      descripcion: { type: DataTypes.TEXT, allowNull: false },
      fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      modelName: "HistorialClinico",
      tableName: "HistorialClinico",
      timestamps: true,
    }
  );
  return HistorialClinico;
};
