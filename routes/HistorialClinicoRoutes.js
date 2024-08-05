const express = require('express');
const router = express.Router();
const {
    getAllHistorialClinico,
    getHistorialClinicoByPaciente
} = require('../controllers/HistorialClinicoController');

/**
 * @swagger
 * tags:
 *   name: HistorialClinico
 *   description: Gestión del historial clínico
 */

/**
 * @swagger
 * /api/historial-clinico:
 *   get:
 *     summary: Obtener todos los registros del historial clínico
 *     tags: [HistorialClinico]
 *     responses:
 *       200:
 *         description: Lista de todos los registros del historial clínico
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   pacienteId:
 *                     type: integer
 *                     example: 1
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-08-03T00:00:00.000Z
 *                   descripcion:
 *                     type: string
 *                     example: "Paciente presenta síntomas de resfriado común."
 *                   Paciente:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                         example: "Juan"
 *                       apellido:
 *                         type: string
 *                         example: "Perez"
 *                   Tratamientos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         description:
 *                           type: string
 *                           example: "Tratamiento para resfriado"
 *                         status:
 *                           type: string
 *                           enum: ["lo tomo", "pospuso", "no lo tomo"]
 *                           example: "lo tomo"
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getAllHistorialClinico);

/**
 * @swagger
 * /api/historial-clinico/paciente/{pacienteId}:
 *   get:
 *     summary: Obtener el historial clínico de un paciente específico
 *     tags: [HistorialClinico]
 *     parameters:
 *       - in: path
 *         name: pacienteId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del paciente
 *     responses:
 *       200:
 *         description: Historial clínico del paciente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   pacienteId:
 *                     type: integer
 *                     example: 1
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-08-03T00:00:00.000Z
 *                   descripcion:
 *                     type: string
 *                     example: "Paciente presenta síntomas de resfriado común."
 *                   Paciente:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                         example: "Juan"
 *                       apellido:
 *                         type: string
 *                         example: "Perez"
 *                   Tratamientos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         description:
 *                           type: string
 *                           example: "Tratamiento para resfriado"
 *                         status:
 *                           type: string
 *                           enum: ["lo tomo", "pospuso", "no lo tomo"]
 *                           example: "lo tomo"
 *       404:
 *         description: Historial clínico no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/paciente/:pacienteId', getHistorialClinicoByPaciente);

module.exports = router;