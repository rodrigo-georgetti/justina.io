const { PersonalMedico } = require("../database/db");

// module.exports = {
//   async All(req, res) {
//     let personalMedico = await PersonalMedico.findAll({
//       include: {
//       association: "Especialidad"
//   }});
//     res.json(personalMedico);
//   },
// };

async function getPersonalMedico(req, res) {
    const personalMedicoId = req.params.id;
    
    try {
        if (personalMedicoId) {
            const personalMedico = await PersonalMedico.findByPk(personalMedicoId, {attributes: [
                "id",
                "especialidadesId",
                "usuariosId",
                "numeroMatricula",
                "active",
              ]});
            if (personalMedico) {
                res.status(200).json(personalMedico);
            } else {
                res.status(404).json({ message: 'Personal Médico no encontrado' });
            }
        } else {
            const personalMedico = await PersonalMedico.findAll({attributes: [
                "id",
                "especialidadesId",
                "usuariosId",
                "numeroMatricula",
                "active",
              ]});
            console.log(personalMedico);
            res.status(200).json(personalMedico);
        }
    } catch (error) {
        console.error('Error al obtener personal médico:', error);
        res.status(500).json({ message: 'Error al obtener personal médico', error });
    }
}


const createPersonalMedico = async (req, res) => {
    const { entidadesId, financiadoresId, personalMedicoId, patologiasId, usuarioID, factorSanguineo, Activo } = req.body;
  
    try {
        const newPatient = await Patients.create({
            entidadesId,
            financiadoresId,
            personalMedicoId,
            patologiasId,
            usuarioID,
            factorSanguineo,
            Activo,
        });

        res.status(201).json({ message: 'Paciente creado correctamente', patient: newPatient });
    } catch (error) {
        console.error('Error al crear paciente:', error);
        res.status(500).json({ message: 'Error al crear paciente', error });
    }
};


const updatePersonalMedico = async (req, res) => {
    const patientId = req.params.id;
    const { entidadesId, financiadoresId, personalMedicoId, patologiasId, usuarioID, factorSanguineo, Activo } = req.body;
    
    try {
        const patient = await Patients.findByPk(patientId);
        if (patient) {
            patient.entidadesId = entidadesId;
            patient.financiadoresId = financiadoresId;
            patient.personalMedicoId = personalMedicoId;
            patient.patologiasId = patologiasId;
            patient.usuarioID = usuarioID;
            patient.factorSanguineo = factorSanguineo;
            patient.Activo = Activo;
            await patient.save();
            res.status(200).json({ message: 'Paciente actualizado', patient });
        } else {
            res.status(404).json({ message: 'Paciente no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar paciente:', error);
        res.status(500).json({ message: 'Error al actualizar paciente', error });
    }
};

const logicalDeletePersonalMedico = async (req, res) => {
    const patientId = req.params.id;
    
    try {
        const patient = await Patients.findByPk(patientId);
        if (patient) {
            await patient.destroy();
            res.status(200).json({ message: 'Paciente eliminado' });
        } else {
            res.status(404).json({ message: 'Paciente no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar paciente:', error);
        res.status(500).json({ message: 'Error al eliminar paciente', error });
    }
};

const physicalDeletePersonalMedico = async (req, res) => {
    const patientId = req.params.id;
    
    try {
        const patient = await Patients.findByPk(patientId);
        if (patient) {
            await patient.destroy();
            res.status(200).json({ message: 'Paciente eliminado' });
        } else {
            res.status(404).json({ message: 'Paciente no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar paciente:', error);
        res.status(500).json({ message: 'Error al eliminar paciente', error });
    }
};

module.exports = {
    getPersonalMedico,
    createPersonalMedico,
    updatePersonalMedico,
    logicalDeletePersonalMedico,
   physicalDeletePersonalMedico,
};