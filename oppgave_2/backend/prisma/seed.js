import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create participant
    const participant = await prisma.participant.create({
        data: {
            name: "Roross",
            email: "Roe@eample.com",
            approvalStatus: "approved",
        },
    });

    console.log("Created participant: ", participant);

    // Occasion data
    const occasionData = {
        name: "Football Match",
        slug: "football-match-2030",
        price: 100,
        date: new Date(),
        adress: "Stadium ABC",
        waitingList: true,
        category: "Sport",
        participants: {
            create: [
                {
                    name: "JoDo",
                    email: "jodo@example.com",
                    approvalStatus: "Godkjent",
                },
            ],
        },
        waitingListParticipants: {
            create: [
                {
                    name: "JaDoe",
                    email: "jadoe@examle.com",
                    approvalStatus: "Ingen",
                },
            ],
        },
        rejectedParticipants: {
            create: [
                {
                    name: "MaSmith",
                    email: "masmith@examle.com",
                    approvalStatus: "Avslått",
                },
            ],
        },
        template: "some-template-id",
        maxParticipants: 20,
        body: {
            create: [
                { content: "Football event" },
                { content: "Participants required" },
                { content: "Bring your own gear" }
            ],
        },
    };

    // Create occasion
    const occasion = await prisma.occasionBaseSchema.create({
        data: occasionData,
    });

    console.log("Created occasion: ", occasion);

    // Retrieve the occasion
    const retrievedOccasion = await prisma.occasionBaseSchema.findUnique({
        where: { slug: "football-match-2030" }, // Use correct slug
        include: {
            body: true, 
        },
    });

    if (retrievedOccasion) {
        const bodyArray = retrievedOccasion.bodyEntries.map(entry => entry.content);
        console.log(bodyArray); 
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });