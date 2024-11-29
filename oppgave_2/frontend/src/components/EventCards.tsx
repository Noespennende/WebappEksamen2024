"use client";

import { Event } from "@/features/events/types";
import EventCard from "./EventCard";

export default function EventCards(){

    /*const {data, status} = useEvents()*/

    /*temp kode. <SLETT></SLETT>*/
    const data: Event[] = []

    return(
        <section id="eventCards">
            <ul>
                {data?.map((meet, index) => (
                    <li className="eventCardListElement" key={`eventCard${index}`}>
                        <EventCard event={meet}/>
                    </li>
                ))}
            </ul>
        </section>
    )
}