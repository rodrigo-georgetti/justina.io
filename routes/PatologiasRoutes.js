const express = require("express");
const router = express.Router();
const {
  getPatologias,
  createPatologias,
  updatePatologias,
  logicalDeletePatologias,
  physicalDeletePatologias,
} = require("../controllers/PatologiasControllers");

/**
 * @swagger
 * tags:
 *   name: Patologias
 *   description: API de Patologias
 */

// Ver lista de Patologias.
/**
 * @swagger
 * /api/v1/patologia:
 *   get:
 *     summary: Lista de todas las Patologias.
 *     description: Devuelve una lista de todas las patologias. Si se proporciona un ID, devuelve la información de esa patologia.
 *     tags: [Patologias]
 *     parameters:
 *       - in: query
 *         name: id
 *         description: El ID de la patologia para ver su información.
 *         schema:
 *           type: string
 *         required: false
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de Patologias.
 *       400:
 *         description: Error con el ID.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", getPatologias);

// Informacion de una Patologia.
/**
 * @swagger
 * /api/v1/patologia/{id}:
 *   get:
 *     summary: Información de una patologia.
 *     description: Devuelve la información de una patologia específica por ID.
 *     tags: [Patologias]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: El ID de la patologia para ver su información.
 *         schema:
 *           type: string
 *         required: true
 *         example: 1
 *     responses:
 *       200:
 *         description: Información de la patologia.
 *       400:
 *         description: Error con el ID.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/:id", getPatologias);

// Crear Patologias.
/**
 * @swagger
 * /api/v1/patologia:
 *   post:
 *     summary: Crear una nueva patologia.
 *     description: EndPoint para crear registros nuevos.
 *     tags: [Patologias]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patologias'
 *       required: true
 *     responses:
 *       200:
 *         description: Nueva patologia creada.
 *       400:
 *         description: Error al crear la patologia.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/", createPatologias);

// Actualizar Patologias.
/**
 * @swagger
 * /api/v1/patologia/{id}:
 *   put:
 *     summary: Actualizar una patologia.
 *     description: EndPoint para actualizar un registro.
 *     tags: [Patologias]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: El ID de la patologia para actualizar.
 *         schema:
 *           type: string
 *         required: true
 *         example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patologias'
 *       required: true
 *     responses:
 *       200:
 *         description: Patologia actualizada.
 *       400:
 *         description: Error al actualizar la patologia.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/:id", updatePatologias);

// Eliminación lógica de una Patologia.
/**
 * @swagger
 * /api/v1/patologia/{id}:
 *   patch:
 *     summary: Eliminación lógica de una patologia.
 *     description: EndPoint para marcar una patologia como eliminada sin borrar el registro de la base de datos.
 *     tags: [Patologias]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: El ID de la patologia para eliminar lógicamente.
 *         schema:
 *           type: string
 *         required: true
 *         example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patologias'
 *       required: true
 *     responses:
 *       200:
 *         description: Patologia marcada como eliminada.
 *       400:
 *         description: Error al eliminar la patologia.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch("/:id", logicalDeletePatologias);

// Eliminación física de una Patologia.
/**
 * @swagger
 * /api/v1/patologia/{id}:
 *   delete:
 *     summary: Eliminación física de una patologia.
 *     description: EndPoint para borrar un registro de la base de datos.
 *     tags: [Patologias]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: El ID de la patologia para eliminar físicamente.
 *         schema:
 *           type: string
 *         required: true
 *         example: 1
 *     responses:
 *       200:
 *         description: Patologia eliminada.
 *       400:
 *         description: Error al eliminar la patologia.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/:id", physicalDeletePatologias);

/**
 * @swagger
 * components:
 *   schemas:
 *     Patologias:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre de la patologia.
 *         description:
 *           type: string
 *           description: Descripción de la patologia.
 *         active:
 *           type: boolean
 *           description: Estado activo de la patologia.
 *       required:
 *         - name
 *         - description
 *         - active
 *       example:
 *         name: Hospital de Oncologia
 *         description: Especialistas en cancer
 *         active: true
 */

module.exports = router;
