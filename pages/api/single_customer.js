import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const customerId = parseInt(req.query.customerId, 10);
    try {
        const customer = await prisma.customer.findUnique({
            where: {
                id: customerId
            }
        });

        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ error: 'Client non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du client', details: error.message });
    }
}
