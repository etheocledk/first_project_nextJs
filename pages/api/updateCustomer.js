// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//     const customerId = parseInt(req.query.customerId, 10);
//     console.log(customerId, 'toto');
//     console.log("toto");
//     res.status(405).json({ error: 'Méthode non autorisée' });
//     // if (req.method === 'PUT') {
//     //     try {
//     //         const updatedCustomer = await prisma.customer.update({
//     //             where: {
//     //                 id: customerId,
//     //             },
//     //             data: {
//     //                 firstName: req.body.firstName,
//     //                 lastName: req.body.lastName,
//     //                 dob: req.body.dob,
//     //                 cp: req.body.cp,
//     //                 income: req.body.income,
//     //                 civ: req.body.civ,
//     //                 email: req.body.email,
//     //                 city: req.body.city,
//     //             },
//     //         });

//     //         res.status(200).json({ message: `Informations mises à jour avec succès` });
//     //     } catch (error) {
//     //         console.error('Erreur lors de la mise à jour du client :', error);
//     //         res.status(500).json({ error: 'Erreur lors de la mise à jour du client', details: error.message });
//     //     }
//     // } else {
//     //     res.status(405).json({ error: 'Méthode non autorisée' });
//     // }
// }

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    console.log("soso");
    if (req.method === 'PUT') {
        console.log("soso");
        const customerId = parseInt(req.query.customerId, 10);
        console.log(customerId, "customerId");
        try {
            const updatedCustomer = await prisma.customer.update({
                where: {
                    id: customerId,
                },
                data: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    dob: req.body.dob,
                    cp: req.body.cp,
                    income: parseInt(req.body.income),
                    civ: req.body.civ,
                    email: req.body.email,
                    city: req.body.city,
                },
            });

            res.status(200).json({ message: `Informations mises à jour avec succès` });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du client :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour du client', details: error.message });
        }
    }
}

