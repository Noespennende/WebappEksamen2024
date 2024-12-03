"use client";

import EventBody from "@/features/events/components/EventBody";
import EventHeaderCategoryAndDate from "@/features/events/components/EventHeaderCategoryAndDate";
import EventPageAdminPanel from "@/features/events/components/EventPageAdminPanel";
import EventPriceAdressAndParticipants from "@/features/events/components/eventPriceAdressAndParticipants";
import EventRegisterParticipants from "@/features/events/components/EventRegisterParticipant";
import { Occasion } from "@/features/events/types";
import { useOccasion } from "@/hooks/useOccasion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Event(){


    const {data, status, getOne, update ,remove, error} = useOccasion()
    const isAdmin: boolean = true //<- sjekk om admin

    console.log(data)

    const { id } = useParams()
    const [signUp, setSignUp] = useState(false)

    const handleSignUpClick = () => {
        setSignUp(true)
    }

    const handleNoParticipants = () => {
        setSignUp(false)
    }

    useEffect(() => {
        getOne(id)
        console.log(data)
    }, [id])

    return (
        <section id="eventPage">
                {(!data || data.length <= 0) ? (<div className="loader" id="eventPageLoader"></div>) : (
                    <div>
                        <article>
                            <EventHeaderCategoryAndDate header={data[0].name} category={data[0].category} date={data[0].date}/>
                            <EventBody body={data[0].body}/>
                            <EventPriceAdressAndParticipants price={data[0].price} adress={data[0].address} participants={data[0].participants.length} maxParticipants={data[0].maxParticipants}/>
                            <button id="signUpButton" className="button" onClick={handleSignUpClick}>Meld deg på</button>
                            {signUp ? <EventRegisterParticipants occasion={data[0]} price={data[0].price} onNoParticipants={handleNoParticipants}/> : ""}
                        </article>
                        {isAdmin ? (
                            <EventPageAdminPanel occasion={data[0]}/>
                        ): ("")}
                            
                            
                    </div>
                )}
        </section>
    )
}




// *Ett* event (Skisse Arrangement-side)

// Tar i bruk services her, @features/events/services/...

// og sender *ferdig* prosessert data videre til Componentet @/features/events/pages/event.tsx
// blir f.eks:
//  import HabitPage from @/features/pages/events/event



