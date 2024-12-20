import { db } from '../../utils';

// Fetch coordinates from the database
export const getCoordinates = async (req, res) => {
    try {
        const clients = await db.userAddress.findMany({
            select: {
                latitude: true,
                longitude: true
            }
        });

        const coordinates = clients.map(client => [
            client.longitude, // Ensure order: longitude first
            client.latitude
        ]);

        res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        res.status(500).json({ error: 'An error occurred while fetching coordinates' });
    }
};

 
