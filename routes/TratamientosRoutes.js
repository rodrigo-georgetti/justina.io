const express = require("express");
const router = express.Router();
const {
  getTratamientos,
  createTratamientos,
  updateTratamientos,
  logicalDeleteTratamientos,
  physicalDeleteTratamientos,
} = require("../controllers/TratamientosControllers");

/**
 * @swagger
 * tags:
 *   name: Tratamientos
 *   description: API para la gestión de tratamientos.
 */

// Ver lista de Tratamientos.
/**
 * @swagger
 * /api/v1/tratamiento/:
 *   get:
 *     summary: Lista de todos los tratamientos.
 *     description: Se obtiene la lista de tratamientos, con o sin parámetros.
 *     tags: [Tratamientos]
 *     responses:
 *       200:
 *         description: Lista de tratamientos obtenida con éxito.
 *       400:
 *         description: Error con el ID.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", getTratamientos);

// Información de un Tratamiento.
/**
 * @swagger
 * /api/v1/tratamiento/{id}:
 *   get:
 *     summary: Información de un tratamiento.
 *     description: Se obtiene la información de un tratamiento por ID.
 *     tags: [Tratamientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: El ID del tratamiento para ver su información.
 *         schema:
 *           type: integer
 *         required: true
 *         example: 1
 *     responses:
 *       200:
 *         description: Información del tratamiento obtenida con éxito.
 *       400:
 *         description: Error con el ID.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/:id", getTratamientos);

// Crear Tratamientos.
/**
 * @swagger
 * /api/v1/tratamiento/:
 *   post:
 *     summary: Crear un nuevo tratamiento.
 *     description: Endpoint para crear un nuevo tratamiento.
 *     tags: [Tratamientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descripción del tratamiento.
 *                 example: "Tratamiento para fiebre"
 *               especialidadesId:
 *                 type: integer
 *                 description: ID de la especialidad asociada.
 *                 example: 2
 *               pacientesId:
 *                 type: integer
 *                 description: ID del paciente asociado.
 *                 example: 3
 *               personalMedicoId:
 *                 type: integer
 *                 description: ID del personal médico asociado.
 *                 example: 4
 *               active:
 *                 type: boolean
 *                 description: Indica si el tratamiento está activo.
 *                 example: true
 *               status:
 *                 type: string
 *                 description: Estado del tratamiento.
 *                 enum: ["lo tomo", "pospuso", "no lo tomo"]
 *                 example: "lo tomo"
 *     responses:
 *       201:
 *         description: Nuevo tratamiento creado con éxito.
 *       400:
 *         description: Error al crear el tratamiento.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/", createTratamientos);

// Actualizar un Tratamiento.
/**
 * @swagger
 * /api/v1/tratamiento/{id}:
 *   put:
 *     summary: Actualizar un tratamiento.
 *     description: Endpoint para actualizar un tratamiento existente.
 *     tags: [Tratamientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: El ID del tratamiento a actualizar.
 *         schema:
 *           type: integer
 *         required: true
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descripción del tratamiento.
 *                 example: "Tratamiento para fiebre"
 *               especialidadesId:
 *                 type: integer
 *                 description: ID de la especialidad asociada.
 *                 example: 2
 *               pacientesId:
 *                 type: integer
 *                 description: ID del paciente asociado.
 *                 example: 3
 *               personalMedicoId:
 *                 type: integer
 *                 description: ID del personal médico asociado.
 *                 example: 4
 *               active:
 *                 type: boolean
 *                 description: Indica si el tratamiento está activo.
 *                 example: true
 *               status:
 *                 type: string
 *                 description: Estado del tratamiento.
 *                 enum: ["lo tomo", "pospuso", "no lo tomo"]
 *                 example: "lo tomo"
 *     responses:
 *       200:
 *         description: Tratamiento actualizado con éxito.
 *       400:
 *         description: Error al actualizar el tratamiento.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/:id", updateTratamientos);

// Eliminar lógicamente un Tratamiento.
/**
 * @swagger
 * /api/v1/tratamiento/{id}:
 *   patch:
 *     summary: Eliminar lógicamente un tratamiento.
 *     description: Endpoint para eliminar lógicamente un tratamiento existente.
 *     tags: [Tratamientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: El ID del tratamiento a eliminar lógicamente.
 *         schema:
 *           type: integer
 *         required: true
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               active:
 *                 type: boolean
 *                 description: Indica si el tratamiento está activo o inactivo.
 *                 example: false
 *     responses:
 *       200:
 *         description: Tratamiento eliminado lógicamente con éxito.
 *       400:
 *         description: Error al eliminar lógicamente el tratamiento.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch("/:id", logicalDeleteTratamientos);

// Eliminar físicamente un Tratamiento.
/**
 * @swagger
 * /api/v1/tratamiento/{id}:
 *   delete:
 *     summary: Eliminar un tratamiento.
 *     description: Endpoint para eliminar físicamente un tratamiento existente.
 *     tags: [Tratamientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: El ID del tratamiento a eliminar.
 *         schema:
 *           type: integer
 *         required: true
 *         example: 1
 *     responses:
 *       200:
 *         description: Tratamiento eliminado físicamente con éxito.
 *       400:
 *         description: Error al eliminar el tratamiento.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/:id", physicalDeleteTratamientos);

module.exports = router;
