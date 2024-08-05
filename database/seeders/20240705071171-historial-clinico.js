'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('HistorialClinico', [
      {
        pacienteId: 1,
        fecha: new Date(),
        descripcion: 'Historial inicial',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('HistorialClinico', null, {});
  }
};
