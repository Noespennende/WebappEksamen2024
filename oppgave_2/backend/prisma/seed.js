import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create participant
    const participant = await prisma.participant.create({
        data: {
            name: "John Doe",
            email: "JoD.de@example.com",
            approvalStatus: "approved",
        },
    });

    console.log("Created participant: ", participant);

    // Create occasion
    const occasion = await prisma.occasionBaseSchema.create({
        data: {
            name: "Annual Sports Meet",
            slug: "annual-sports-meet",
            price: 100,
            adress: "123 Sports Ave, City",
            waitingList: true,
            template: "sports_template", // Ensure this is correct if a template is required
            maxParticipants: 50,
            category: "Sport",
            date: new Date(),
            participants: {
                connect: { id: participant.id }, // Connecting the participant to the occasion
            },
        },
    });

    console.log("Created occasion: ", occasion);

    // Create template, using the occasion's ID if needed
    const template = await prisma.templateBaseSchema.create({
        data: {
            name: "Sports Event Template",
            price: 500,
            maxParticipants: 100,
            isPrivate: false,
            fixedPrice: true,
            allowSameDayEvent: true,
            waitList: true,
            limitedParticipants: false,
            // Connect to the occasion, assuming you need this connection:
            fixedWeekDays: {
                connect: [{ id: occasion.id }],
            },
        },
    });

    console.log("Created template: ", template);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
