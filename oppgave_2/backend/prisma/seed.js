import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
    const participantsData = [
        {
            name: "Alice Jazz",
            email: "alice.jazz@example.com",
            approvalStatus: "Godkjent",
            registerDate: new Date("2024-04-12"),
        },
        {
            name: "Bob Blues",
            email: "bob.blues@example.com",
            approvalStatus: "Ingen",
            registerDate: new Date("2024-04-15"),
        },
        {
            name: "Charlie Sax",
            email: "charlie.sax@example.com",
            approvalStatus: "Avslått",
            registerDate: new Date("2023-12-10"),
        },
    ];

    for (const participant of participantsData) {
        await prisma.participant.upsert({
            where: { email: participant.email },
            update: {},  
            create: participant, 
        });
    }

  
    const existingTemplate = await prisma.templateBaseSchema.findUnique({
        where: { id: "f8fba032-0488-47df-9c23-72211dbcd501" }, 
    });

    let templateId;
    if (!existingTemplate) {
        const newTemplate = await prisma.templateBaseSchema.create({
            data: {
                id: uuidv4(),
                name: "Jazz Festival Template",
                price: 150,
                maxParticipants: 100,
                isPrivate: false,
                fixedPrice: true,
                allowSameDayEvent: true,
                waitList: true,
                limitedParticipants: false,
            },
        });
        templateId = newTemplate.id;
    } else {
        templateId = existingTemplate.id;
    }

    console.log("Template ID: ", templateId);

    
    const occasionData = {
        name: "Jazz Festival 2024",
        slug: "JazzFestival2024",
        price: 150,
        date: new Date(),
        adress: "Jazz Arena 44",
        waitingList: true,
        category: "Music", 
        participants: {
            connect: [
                { email: "alice.jazz@example.com" }, 
            ],
        },
        waitingListParticipants: {
            connect: [
                { email: "bob.blues@example.com" },
            ],
        },
        rejectedParticipants: {
            connect: [
                { email: "charlie.sax@example.com" },
            ],
        },
        template: {
            connect: { id: templateId },  
        },
        maxParticipants: 100,
        body: {
            create: [
                { content: "Join us for an unforgettable night of jazz music!" },
                { content: "Live performances by top jazz musicians, including a saxophone solo." },
                { content: "Enjoy some of the best jazz performances under the stars at the Jazz Arena." },
                { content: "Food and drinks available at the venue. Don't miss out on this amazing experience!" },
            ],
        },
    };


    const occasion = await prisma.occasionBaseSchema.create({
        data: occasionData,
    });

    console.log("Created Jazz Festival occasion: ", occasion);


    const retrievedOccasion = await prisma.occasionBaseSchema.findUnique({
        where: { slug: "JazzFestival2024" },
        include: {
            body: true,  
        },
    });

    if (retrievedOccasion) {
        const bodyArray = retrievedOccasion.body.map(entry => entry.content);
        console.log("Body entries: ", bodyArray);
    } else {
        console.log("Occasion not found.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


/*

NFL WATCHALONG
const prisma = new PrismaClient();

async function main() {
    // Step 1: Create participants
    const participantsData = [
        {
            name: "Jon Donald",
            email: "jod@example.com",
            approvalStatus: "Godkjent",
            registerDate: new Date("2024-03-12"),
        },
        {
            name: "JaDoe",
            email: "jadoe@example.com",
            approvalStatus: "Ingen",
            registerDate: new Date("2024-03-10"),
        },
        {
            name: "Smith",
            email: "smith@example.com",
            approvalStatus: "Avslått",
            registerDate: new Date("2023-03-10"),
        },
    ];

    for (const participant of participantsData) {
        await prisma.participant.upsert({
            where: { email: participant.email },
            update: {},  // Do nothing if the participant already exists
            create: participant,  // Create a new participant if not exists
        });
    }

    // Step 2: Create a template (if it doesn't exist already)
    const existingTemplate = await prisma.templateBaseSchema.findUnique({
        where: { id: "f8fba032-0488-47df-9c23-72211dbcd501" }, 
    });

    let templateId;
    if (!existingTemplate) {
        const newTemplate = await prisma.templateBaseSchema.create({
            data: {
                id: uuidv4(),
                name: "Sports Template",
                price: 100,
                maxParticipants: 30,
                isPrivate: false,
                fixedPrice: true,
                allowSameDayEvent: true,
                waitList: true,
                limitedParticipants: false,
            },
        });
        templateId = newTemplate.id;
    } else {
        templateId = existingTemplate.id;
    }

    console.log("Template ID: ", templateId);

    // Step 3: Create the occasion with related participants, body entries, and templates
    const occasionData = {
        name: "NFL WatchAlong",
        slug: "NFLWA",
        price: 100,
        date: new Date(),
        adress: "NFLKINO 66",
        waitingList: true,
        category: "Sport",
        participants: {
            connect: [
                { email: "jod@example.com" }, 
            ],
        },
        waitingListParticipants: {
            connect: [
                { email: "jadoe@example.com" },
            ],
        },
        rejectedParticipants: {
            connect: [
                { email: "smith@example.com" },
            ],
        },
        template: {
            connect: { id: templateId },  
        },
        maxParticipants: 20,
        body: {
            create: [
                { content: "NFL kamp" },
                { content: "Vi griller utenfor lokalet. Ta med egen drikke." },
                { content: "Endelig er dagen her, Cowboys tar imot Seahawks i Texas. Dette blir en skikkelig bra match!" },
            ],
        },
    };

    const occasion = await prisma.occasionBaseSchema.create({
        data: occasionData,
    });

    console.log("Created occasion: ", occasion);

    const retrievedOccasion = await prisma.occasionBaseSchema.findUnique({
        where: { slug: "NFLWA" },
        include: {
            body: true,  
        },
    });

    if (retrievedOccasion) {
        const bodyArray = retrievedOccasion.body.map(entry => entry.content);
        console.log("Body entries: ", bodyArray);
    } else {
        console.log("Occasion not found.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });*/
