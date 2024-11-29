"use client";
import { Event} from "@/features/events/types";
import { EventStatus } from "@/types/Types";
import Link from "next/link";

type eventCardProps = {
    event: Event
}

export default function EventCard({event}: eventCardProps) {

    const dayAndMonth = Intl.DateTimeFormat("nb-NO", {
        day: "numeric",
        month: "short",
        year: "numeric"
    }).format(event.date)

    const year = Intl.DateTimeFormat("nb-NO", {
        year: "numeric"
    }).format(event.date)

    let status: EventStatus = "Ledig"

    if (event.maxParticipants && event.participants.length >= event.maxParticipants){
        if( event.waitinglist){
            status = "Vente liste"
        } else {
            status = "Fullt"
        }
    } 

    return(
        <Link href={`/arrangement/${event.id}`} className="eventCard">
            <article>
                <div className="eventCardDate">
                    <p className="eventCardDayAndMonth">{dayAndMonth.toUpperCase()}</p>
                    <p className="eventCardYear">{year.toUpperCase()}</p>
                </div>
                <div className="eventCardNameAndCategory">
                    <h2 className="eventCardName">{event.name}</h2>
                    <h3 className="eventCardCategory">{event.category}</h3>
                </div>
                <p className="eventCardPrice">{`${event.price},-`}</p>
                <div className="eventCardStatusBox">
                    <p className={`eventCardStatus ${status}`} >{status}</p>
                </div>
            </article>
        </Link>
    )
}