"use client";

import { Occasion } from "@/features/events/types";
import EventCard from "./EventCard";
import { useOccasion } from "@/hooks/useOccasion";

export default function EventCards(){

    const {data, status, get} = useOccasion()
    

    return(
        <section id="eventCards">

            { status.loading ? (<div className="loader"></div>) : 
            (
                <ul>
                {data?.map((occasion, index) => (
                    <li className="eventCardListElement" key={`eventCard${index}`}>
                        <EventCard occation={occasion}/>
                    </li>
                ))}
            </ul>

            )
        }
            
        </section>
    )
}