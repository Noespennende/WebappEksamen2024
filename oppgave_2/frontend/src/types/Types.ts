import { UUID } from "crypto";

export type event = {
    id: UUID,
    slug: String,
    body: String[],
    price: number,
    category: categories,
    date: Date,
    adress: String,
    participants: participant[],
    waitingList: boolean,
    waitingListParticipants: participant[]

}

export type participant = {
    id: UUID,
    name: String,
    email: String
}

export type template = {
    id: UUID,
    name: String,
    private: boolean,
    allowSameDayEvent: boolean,
    waitList: boolean,
    setPrice: boolean,
    price: number,
    limitedParticipants: boolean,
    maxParticipants: number,
    fixedWeekdays: weekdays[]

}

export enum categories {
    Sport = "Sport",
    Social = "Sosialt",
    Meeting = "Møte",
    Other = "Andre"
}

export enum weekdays {
    Monday = "Mandag",
    Tuesday = "Tirsdag",
    Wednesday = "Onsdag",
    Thursday = "Torsdag",
    Friday = "Fredag",
    Saturday = "Lørdag",
    Sunday = "Søndag"
}