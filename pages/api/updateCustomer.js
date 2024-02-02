import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const customers = await prisma.customer.update({
        where: {
            id: 1
        },
        data: {
            firstName: 'Job'
        }
    })
    res.status(200).send('Ok');
}