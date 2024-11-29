"use client";

import { Occasion } from "@/features/events/types";
import EventCard from "./EventCard";

export default function EventCards(){

    /*const {data, status} = useEvents()*/

    let status = {loading: true}

    /*temp kode. <SLETT></SLETT>*/
    const data: Occasion[] = []

    return(
        <section id="eventCards">

            { status.loading ? (<div className="loader"></div>) : 
            (
                <ul>
                {data?.map((meet, index) => (
                    <li className="eventCardListElement" key={`eventCard${index}`}>
                        <EventCard event={meet}/>
                    </li>
                ))}
            </ul>

            )
        }
            
        </section>
    )
}