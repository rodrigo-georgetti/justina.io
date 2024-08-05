const { HistorialClinico, Pacientes, Tratamientos } = require("../database/db");

const getAllHistorialClinico = async (req, res) => {
  try {
    const historial = await HistorialClinico.findAll({
      include: [
        {
          model: Pacientes,
          as: "Paciente",
          attributes: ["nombre", "apellido"]
        },
        {
          model: Tratamientos,
          as: "Tratamientos",
          attributes: ["description", "status"]
        }
      ]
    });
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

const getHistorialClinicoByPaciente = async (req, res) => {
  const { pacienteId } = req.params;
  try {
    const historial = await HistorialClinico.findAll({
      where: { pacienteId },
      include: [
        {
          model: Pacientes,
          as: "Paciente",
          attributes: ["nombre", "apellido"]
        },
        {
          model: Tratamientos,
          as: "Tratamientos",
          attributes: ["description", "status"]
        }
      ]
    });
    if (!historial) {
      return res.status(404).json({ message: "Historial clínico no encontrado" });
    }
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

module.exports = {
  getAllHistorialClinico,
  getHistorialClinicoByPaciente
};
