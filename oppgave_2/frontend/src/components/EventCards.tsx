"use client";

import { Occasion } from "@/features/events/types";
import EventCard from "./EventCard";
import { useOccasion } from "@/hooks/useOccasion";
import { useEffect } from "react";
import { useTemplate } from "@/hooks/useTemplate";

export default function EventCards(){

    const {data, status} = useOccasion()
    
    
    useEffect(() => {
    }, [data])



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