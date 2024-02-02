import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const customerId = parseInt(req.query.customerId, 10);
    try {
        const deletedCustomer = await prisma.customer.delete({
            where: {
                id: customerId
            }
        });

        res.status(200).json({ message: `Client ${deletedCustomer.id} supprimé avec succès` });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du client', details: error.message });
    }
}
