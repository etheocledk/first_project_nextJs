
import { PrismaClient } from "@prisma/client";
import csv from 'csv-parser';
import { Readable } from 'stream';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const fileContent = req.body;

        const records = await parseCSV(fileContent, ';');

        const newRecords = records.slice(4);
        newRecords.pop();
        const dataRecords = newRecords;


        for (const record of dataRecords) {
            if (Object.keys(record).length !== 0) {
                const recordKey = Object.keys(record);
                const recordString = record[recordKey];
                const newObject = recordString.split(";")
                console.log("recordString", recordString.split(";")[0]);
                const formattedDate = newObject[4].split('/')


                await prisma.customer.create({
                    data: {
                        email: newObject[0],
                        civ: newObject[1],
                        firstName: newObject[2],
                        lastName: newObject[3],
                        dob: new Date(2002, 10, 2),
                        city: newObject[5],
                        cp: newObject[6],
                        income: parseInt(newObject[7]),
                    }
                });
            }
        }

        res.status(201).send('Clients ajoutés avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'ajout des clients :', error);
        res.status(500).send('Erreur interne du serveur');
    }
}

async function parseCSV(fileContent, delimiter) {
    return new Promise((resolve, reject) => {
        const records = [];
        const bufferStream = new Readable();
        bufferStream.push(fileContent);
        bufferStream.push(null);

        bufferStream
            .pipe(csv({ delimiter, quote: '"' }))
            .on('data', (data) => records.push(data))
            .on('end', () => resolve(records))
            .on('error', (error) => reject(error));
    });
}

function formatDate(inputDate) {
    const [day, month, year] = inputDate.split('/');
    return `${year}-${month}-${day}`;
}
