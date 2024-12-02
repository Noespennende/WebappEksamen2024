import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const participants = await prisma.participant.createMany({
        data: [
            { name: "Alice Johnson", email: "alice.j@example.com", approvalStatus: "Godkjent", registerDate: new Date("2022-01-15"), approvalDate: new Date("2022-01-16") },
            { name: "Bob Smith", email: "bob.s@example.com", approvalStatus: "Avslått", registerDate: new Date("2023-03-10"), approvalDate: null },
            { name: "Charlie Brown", email: "charlie.b@example.com", approvalStatus: "Ingen", registerDate: new Date("2024-06-20"), approvalDate: null },
        ],
    });

    console.log("Opprettet deltakere: ", participants);

    const occasions = await prisma.occasionBaseSchema.createMany({
        data: [
            {
                id: "football-2025",
                name: "Football Match",
                slug: "football-match-2025",
                price: 200,
                adress: "Stadium A",
                waitingList: true,
                template: "template-1",
                maxParticipants: 30,
                category: "Sport",
                date: new Date("2025-05-10"),
            },
            {
                id: "concert-2026",
                name: "Jazz Concert",
                slug: "jazz-concert-2026",
                price: 300,
                adress: "Music Hall B",
                waitingList: false,
                template: "template-2",
                maxParticipants: 100,
                category: "Social",
                date: new Date("2026-09-15"),
            },
            {
                id: "meeting-2027",
                name: "Tech Conference",
                slug: "tech-conference-2027",
                price: 150,
                adress: "Convention Center C",
                waitingList: true,
                template: "template-3",
                maxParticipants: 50,
                category: "Meeting",
                date: new Date("2027-11-20"),
            },
        ],
    });

    console.log("Opprettet arrangementer: ", occasions);
    const bodyEntries = await prisma.bodyEntry.createMany({
        data: [
            { content: "Welcome to the football event!", occasionId: "football-2025" },
            { content: "Jazz night featuring local artists.", occasionId: "concert-2026" },
            { content: "Join us for insights on AI and technology.", occasionId: "meeting-2027" },
        ],
    });

    console.log("Opprettet arrangement-innhold: ", bodyEntries);


    const allOccasions = await prisma.occasionBaseSchema.findMany({
        include: {
            body: true,
            participants: true,
            waitingListParticipants: true,
            rejectedParticipants: true,
        },
    });

    console.log("Alle arrangementer med innhold: ", allOccasions);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
