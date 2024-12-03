import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
/*
async function main() {
    const participantsData = [
        {
            name: "Alice Smile",
            email: "alice.smile@example.com",
            approvalStatus: "Godkjent",
            registerDate: new Date("2024-05-10"),
        },
        {
            name: "Bob Cheers",
            email: "bob.cheers@example.com",
            approvalStatus: "Ingen",
            registerDate: new Date("2024-06-01"),
        },
        {
            name: "Charlie Fun",
            email: "charlie.fun@example.com",
            approvalStatus: "Avslått",
            registerDate: new Date("2023-11-20"),
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
                name: "Social",
                price: 150,
                maxParticipants: 300,
                isPrivate: false,
                fixedPrice: true,
                allowSameDayEvent: true,
                waitList: true,
                limitedParticipants: true,
            },
        });
        templateId = newTemplate.id;
    } else {
        templateId = existingTemplate.id;
    }

    console.log("Template ID: ", templateId);

 
    const occasionData = {
        name: "Social Fiesta 2025",  
        slug: "SocialFiesta2025",   
        price: 250,
        createdAt: new Date(),                 
        date: new Date("2025-01-20T19:00:00Z"),  
        address: "Sunset Social Club 2025",
        waitingList: true,
        category: "Social",         
        participants: {
            connect: [
                { email: "alice.smile@example.com" }, 
            ],
        },
        waitingListParticipants: {
            connect: [
                { email: "bob.cheers@example.com" }, 
            ],
        },
        rejectedParticipants: {
            connect: [
                { email: "charlie.fun@example.com" },  
            ],
        },
        template: {
            connect: { id: templateId },  
        },
        maxParticipants: 100,        
        body: {
            create: [
                { content: "Join us for an amazing evening at the Social Fiesta 2025!" },
                { content: "Get ready for socializing, great music, and fun vibes!" },
                { content: "Meet new people and create unforgettable memories together!" },
                { content: "Sunset views, delicious food, and a vibrant atmosphere await you!" },
            ],
        },
    };

  
    const occasion = await prisma.occasionBaseSchema.create({
        data: occasionData,
    });

    console.log("Created occasion: ", occasion);

  
    const retrievedOccasion = await prisma.occasionBaseSchema.findUnique({
        where: { slug: "SocialFiesta2025" },
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
async function main() {
   
    const participantsData = [
        {
            name: "John Rock",
            email: "john.rock@example.com",
            approvalStatus: "Godkjent",
            registerDate: new Date("2024-05-10"),
        },
        {
            name: "Eve Groove",
            email: "eve.groove@example.com",
            approvalStatus: "Ingen",
            registerDate: new Date("2024-06-01"),
        },
        {
            name: "Sam Jazz",
            email: "sam.jazz@example.com",
            approvalStatus: "Avslått",
            registerDate: new Date("2023-11-20"),
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
                name: "Festival",
                price: 200,
                maxParticipants: 500,
                isPrivate: false,
                fixedPrice: true,
                allowSameDayEvent: true,
                waitList: true,
                limitedParticipants: true,
            },
        });
        templateId = newTemplate.id;
    } else {
        templateId = existingTemplate.id;
    }

    console.log("Template ID: ", templateId);

   
    const occasionData = {
        name: "Rock Festival 2025",  
        slug: "RockFest2025",      
        price: 400,
        createdAt: new Date(),
        date: new Date("2025-01-15T19:00:00Z"), 
        address: "Grand Rock Arena 2025",
        waitingList: true,
        category: "Other", 
        participants: {
            connect: [
                { email: "john.rock@example.com" },  
            ],
        },
        waitingListParticipants: {
            connect: [
                { email: "eve.groove@example.com" }, 
            ],
        },
        rejectedParticipants: {
            connect: [
                { email: "sam.jazz@example.com" },  
            ],
        },
        template: {
            connect: { id: templateId },  
        },
        maxParticipants: 150,
        body: {
            create: [
                { content: "Experience an unforgettable Rock festival in 2025!" },
                { content: "Live music, food, and a vibrant atmosphere!" },
                { content: "Join us for an epic celebration of rock music at the Grand Rock Arena." },
                { content: "Prepare for high-energy performances from top rock bands!" },
            ],
        },
    };

  
    const occasion = await prisma.occasionBaseSchema.create({
        data: occasionData,
    });

    console.log("Created occasion: ", occasion);

   
    const retrievedOccasion = await prisma.occasionBaseSchema.findUnique({
        where: { slug: "RockFest2025" },
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
/*
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

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
                name: "Jazz Festival",
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
        createdAt: new Date(2025, 10, 11),
        date: new Date(),
        address: "Jazz Arena 44",
        waitingList: true,
        category: "Other", 
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
async function main() {
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

    
    const occasionData = {
        name: "NFL WatchAlong",
        slug: "NFLWA",
        price: 100,
        createdAt: new Date(2020, 11, 11),
        date: new Date(),
        address: "NFLKINO 66",
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

    
    const occasionData = {
        name: "NFL WatchAlong",
        slug: "NFLWA",
        price: 100,
        createdAt: new Date(2020, 11, 11),
        date: new Date(),
        address: "NFLKINO 66",
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

    const occasionData2 = {
        name: "Kaffeslabberas hos tante Tuva",
        slug: "kaffeslabberas",
        price: 100,
        createdAt: new Date(2020, 11, 11),
        date: new Date(),
        address: "Kaffeveien 28, Oslo",
        waitingList: true,
        category: "Sport",
        participants: {
            connect: [
                { email: "Gunnar@example.com" }, 
            ],
        },
        waitingListParticipants: {
            connect: [
                { email: "Fredrik@example.com" },
            ],
        },
        rejectedParticipants: {
            connect: [
                { email: "Trine@example.com" },
            ],
        },
        template: {
            connect: { id: templateId },  
        },
        maxParticipants: 20,
        body: {
            create: [
                { content: "Kaffeslabberas hos tante Tuva. Kaffe og vafler serveres" },
                { content: "Strikketøy må tas med selv" },
            ],
        },
    };


    const occasionData3 = {
        name: "Hardrock konsert på Halden festning",
        slug: "halden-festning-konsert",
        price: 250,
        createdAt: new Date(2021, 3, 11),
        date: new Date(),
        address: "Halden festning",
        waitingList: true,
        category: "Sport",
        participants: {
            connect: [
                { email: "Theexterminator@example.com" }, 
            ],
        },
        waitingListParticipants: {
            connect: [
                { email: "Rocker@example.com" },
            ],
        },
        rejectedParticipants: {
            connect: [
                { email: "tilfeldigForbipasserende@example.com" },
            ],
        },
        template: {
            connect: { id: templateId },  
        },
        maxParticipants: 20,
        body: {
            create: [
                { content: "Hardrock konsert" },
                { content: "Hard rock hardere konsert." },
                { content: "Bare langt hår tillat" },
            ],
        },
    };

    const occasion = await prisma.occasionBaseSchema.create({
        data: occasionData,
    });
/*
    const occasion2 = await prisma.occasionBaseSchema.create({
        data: occasionData2,
    });

    const occasion3 = await prisma.occasionBaseSchema.create({
        data: occasionData3,
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

    async function main() {
        const participantsData = [
            {
                name: "Anna Social",
                email: "anna.social@example.com",
                approvalStatus: "Godkjent",
                registerDate: new Date("2024-09-10"),
            },
            {
                name: "Jake Friendly",
                email: "jake.friendly@example.com",
                approvalStatus: "Ingen",
                registerDate: new Date("2024-09-15"),
            },
            {
                name: "Lucy Warm",
                email: "lucy.warm@example.com",
                approvalStatus: "Avslått",
                registerDate: new Date("2024-09-12"),
            },
            {
                name: "Mark Curious",
                email: "mark.curious@example.com",
                approvalStatus: "Godkjent",
                registerDate: new Date("2024-10-01"),
            },
            {
                name: "Sophia Learn",
                email: "sophia.learn@example.com",
                approvalStatus: "Ingen",
                registerDate: new Date("2024-10-03"),
            },
            {
                name: "James Explore",
                email: "james.explore@example.com",
                approvalStatus: "Avslått",
                registerDate: new Date("2024-10-20"),
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
                    name: "General Template",
                    price: 100,
                    maxParticipants: 300,
                    isPrivate: false,
                    fixedPrice: true,
                    allowSameDayEvent: false,
                    waitList: true,
                    limitedParticipants: true,
                },
            });
            templateId = newTemplate.id;
        } else {
            templateId = existingTemplate.id;
        }
    
        console.log("Template ID: ", templateId);
    
        const socialEventData = {
            name: "Social Gathering 2025",
            slug: "social-gathering-2025",
            price: 120,
            createdAt: new Date(),
            date: new Date("2025-04-20T18:00:00Z"),
            address: "Downtown Social Hub",
            waitingList: true,
            category: "Social",
            participants: {
                connect: [
                    { email: "anna.social@example.com" },
                ],
            },
            waitingListParticipants: {
                connect: [
                    { email: "jake.friendly@example.com" },
                ],
            },
            rejectedParticipants: {
                connect: [
                    { email: "lucy.warm@example.com" },
                ],
            },
            template: {
                connect: { id: templateId },
            },
            maxParticipants: 150,
            body: {
                create: [
                    { content: "Enjoy an evening of laughter, food, and community bonding!" },
                    { content: "Meet new friends and reconnect with old ones!" },
                ],
            },
        };
    
        const otherEventData = {
            name: "Exploration Meetup 2025",
            slug: "exploration-meetup-2025",
            price: 100,
            createdAt: new Date(),
            date: new Date("2025-05-15T10:00:00Z"),
            address: "Adventure Center",
            waitingList: true,
            category: "Other",
            participants: {
                connect: [
                    { email: "mark.curious@example.com" },
                ],
            },
            waitingListParticipants: {
                connect: [
                    { email: "sophia.learn@example.com" },
                ],
            },
            rejectedParticipants: {
                connect: [
                    { email: "james.explore@example.com" },
                ],
            },
            template: {
                connect: { id: templateId },
            },
            maxParticipants: 200,
            body: {
                create: [
                    { content: "Join us for a day of exploration and discovery!" },
                    { content: "Perfect for adventurers and curious minds alike." },
                ],
            },
        };
    
        const socialEvent = await prisma.occasionBaseSchema.create({
            data: socialEventData,
        });
    
        console.log("Created social event: ", socialEvent);
    
        const otherEvent = await prisma.occasionBaseSchema.create({
            data: otherEventData,
        });
    
        console.log("Created other event: ", otherEvent);
    }
    
    main()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
    
