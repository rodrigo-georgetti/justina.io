const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Users, Ubicaciones } = require("../database/db"); 

const loginUser = async (req, res) => {
  const { dniType, dni, password } = req.body;
  //console.log('se obtuvieron los datos' ,{ dniType, dni, password} )

  try {
    console.log('buscando usuarios relacionados con userId')
    const user = await Users.findOne({
      where: { dniType, dni },
      attributes: [
        "id",
        "dniType",
        "dni",
        "password",
        "firstName",
        "lastName",
        "birthday",
        "role",
        "gender",
        "email",
        "phone",
        "active",
      ],
      include: [
        {
          model: Ubicaciones,
          as: "domicilio",
          attributes: [
            "id",
            "usuariosId",
            "pais",
            "provincias",
            "localidad",
            "direccion",
            "active",
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.TOKEN_KEY, {
      expiresIn: "1h"
    });
    res.status(200).json({ message: "User logged in successfully", user, token });

  } catch (error) {
    console.error("failed to login:", error);
    res.status(500).json({ message: "failed to login", error });
  }
};

module.exports = {
  loginUser,
};

