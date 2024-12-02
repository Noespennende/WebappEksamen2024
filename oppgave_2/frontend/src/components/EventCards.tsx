"use client";

import { Occasion } from "@/features/events/types";
import EventCard from "./EventCard";

type eventCardsProps = {
    occasionList: Occasion[]
}


export default function EventCards({occasionList}: eventCardsProps){

    return(
        <section id="eventCards">

            { occasionList ? 
            (
                <ul>
                {occasionList.map((occasion, index) => (
                    <li className="eventCardListElement" key={`eventCard${index}`}>
                        <EventCard occation={occasion}/>
                    </li>
                ))} 
            </ul>

            ) : (<div className="loader"></div>) 
        }
            
        </section>
    )
}