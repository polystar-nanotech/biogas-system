import { db, hashPassword } from "../../utils"

export const CreateUser = async (req, res) => {
    const body = req.body;
    // Check if user phone number already exists
    const userExists = await db.user.findFirst({ where: { telephone: body.telephone } });
    if (userExists) {
        return res.status(409).json({ statusCode: 409, success: false, message: "Phone number is already taken." })
    }

    try {
        const userAddress = await db.userAddress.create({
            data: {
                cell: body.address.cell,
                sector: body.address.sector,
                district: body.address.district,
                province: body.address.province,
                village: body.address.village,
                latitude: body.address.latitude,
                longitude: body.address.longitude,
            }
        });

        const password = await hashPassword(body.password);
        const userData = await db.user.create({
            data: {
                names: body.names,
                addressId: userAddress.id,
                telephone: body.telephone,
                password
            },
            select: { names: true, telephone: true }
        })
        return res.status(201).json({ statusCode: 201, success: true, message: "Successfully Registered.", user: { ...userData, address: userAddress } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            statusCode: 500,
            success: true,
            message: `Something went wrong, try again`
        })
    }
}