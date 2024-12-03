"use client";
import { Occasion } from "@/features/events/types";
import { OccasionStatus} from "@/types/Types";
import Link from "next/link";

type eventCardProps = {
    occation: Occasion
}

export default function EventCard({occation: occasion}: eventCardProps) {

    const dayAndMonth = Intl.DateTimeFormat("nb-NO", {
        day: "numeric",
        month: "short",
    }).format(new Date(occasion.date))

    const year = Intl.DateTimeFormat("nb-NO", {
        year: "numeric"
    }).format(new Date(occasion.date))

    let status: OccasionStatus = "Ledig"

    if (occasion.maxParticipants && occasion.participants.length >= occasion.maxParticipants){
        if( occasion.waitinglist){
            status = "Venteliste"
        } else {
            status = "Fullt"
        }
    } 

    return(
        <Link href={`/arrangementer/${occasion.slug}`} className="eventCard">
            <article>
                <div className="eventCardDate">
                    <p className="eventCardDayAndMonth">{dayAndMonth.toUpperCase().replace(".", "")}</p>
                    <p className="eventCardYear">{year.toUpperCase()}</p>
                </div>
                <div className="eventCardNameAndCategory">
                    <h2 className="eventCardName">{occasion.name}</h2>
                    <h3 className="eventCardCategory">{occasion.category}</h3>
                </div>
                <p className="eventCardPrice">{`${occasion.price},-`}</p>
                <div className={`eventCardStatusBox ${status}`}>
                    <p className={`eventCardStatus ${status}`}>{status}</p>
                </div>
            </article>
        </Link>
    )
}