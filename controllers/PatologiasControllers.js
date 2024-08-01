const { Patologias } = require("../database/db");

const getPatologias = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const Patologia = await Patologias.findByPk(id, {
        attributes: ["id", "name", "especialidadesId", "description", "active"],
      });
      if (Patologia) {
        res.status(200).json(Patologia);
      } else {
        res.status(404).json({ message: "Patologia no encontrado" });
      }
    } else {
      const Patologia = await Patologias.findAll({
        attributes: ["id", "name", "especialidadesId", "description", "active"],
      });
      res.status(200).json(Patologia);
    }
  } catch (error) {
    console.error("Error al obtener la Patologia", error);
    res.status(500).json({ message: "Error al obtener las Patologias", error });
  }
};

const createPatologias = async (req, res) => {
  const { name, description, especialidadesId, active } = req.body;

  try {
    const newPatologia = await Patologias.create({
      name,
      description,
      especialidadesId,
      active,
    });

    res
      .status(201)
      .json({
        message: "Patologia creada correctamente",
        Entidad: newPatologia,
      });
  } catch (error) {
    console.error("Error al crear Patologia:", error);
    res.status(500).json({ message: "Error al crear Patologia", error });
  }
};

const updatePatologias = async (req, res) => {
  const { id } = req.params;
  const { name, description, especialidadesId, active } = req.body;

  try {
    const Patologia = await Patologias.findByPk(id, {
      attributes: ["id", "name", "especialidadesId", "description", "active"],
    });
    if (Patologia) {
      if (name !== undefined) Patologia.name = name;
      if (especialidadesId !== undefined)
        Patologia.especialidadesId = especialidadesId;
      if (description !== undefined) Patologia.description = description;
      if (active !== undefined) Patologia.active = active;

      await Patologia.save();
      res.status(200).json({ message: "Patologia actualizado", Patologia });
    } else {
      res.status(404).json({ message: "Patologia no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar Patologia:", error);
    res.status(500).json({ message: "Error al actualizar Patologia", error });
  }
};

const logicalDeletePatologias = async (req, res) => {
  const patologiaId = req.params.id;
  const { active } = req.body;

  if (typeof active !== "boolean") {
    return res
      .status(400)
      .json({ message: "El campo 'active' debe ser un valor booleano" });
  }

  try {
    const patologias = await Patologias.findByPk(patologiaId, {
      attributes: ["id", "name", "especialidadesId", "description", "active"],
    });

    if (!patologias) {
      return res.status(404).json({ message: "Patología no encontrada" });
    }

    patologias.active = active;
    await patologias.save();

    const status = patologias.active ? "activado" : "desactivado";
    res.status(200).json({ message: `Patologías ${status}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar el estado de la patología",
      error,
    });
  }
};

const physicalDeletePatologias = async (req, res) => {
  const { id } = req.params;

  try {
    const Patologia = await Patologias.findByPk(id, {
      attributes: ["id", "name", "especialidadesId", "description", "active"],
    });
    if (Patologia) {
      await Patologia.destroy();
      res.status(200).json({ message: "Patologia eliminada" });
    } else {
      res.status(404).json({ message: "Patologia no encontrada" });
    }
  } catch (error) {
    console.error("Error al eliminar Patologia:", error);
    res.status(500).json({ message: "Error al eliminar Patologia", error });
  }
};

module.exports = {
  getPatologias,
  createPatologias,
  updatePatologias,
  logicalDeletePatologias,
  physicalDeletePatologias,
};
