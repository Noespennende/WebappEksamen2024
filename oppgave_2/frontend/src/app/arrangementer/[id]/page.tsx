"use client";

import EventBody from "@/features/events/components/EventBody";
import EventHeaderCategoryAndDate from "@/features/events/components/EventHeaderCategoryAndDate";
import EventPageAdminPanel from "@/features/events/components/EventPageAdminPanel";
import EventPriceAdressAndParticipants from "@/features/events/components/eventPriceAdressAndParticipants";
import EventRegisterParticipants from "@/features/events/components/EventRegisterParticipant";
import { Occasion } from "@/features/events/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Event(){


    //Delete
    const data: Occasion[] = [{
        id: "12344",
        name: "Eksempel Arrangement",
        slug: "12345",
        price: 230,
        date: new Date(),
        address: "BRA veien 8, Halden",
        body: ["qie9hg+09ehqg0hqaeg0åqehg0qehgqeghqea0opighqe0gihq0hgoieghqå3hqg0qhgqighq0hgq0ighq0hg0qhgqgqgqwgqwgqg3qgeag3q"],
        waitinglist: false,
        category: "Sport",
        participants: [{id: crypto.randomUUID(), name: "Nils", email: "email@email.com", aprovalStatus: "Godkjent", aprovalDate: null, registerDate: new Date()},{id: crypto.randomUUID(), name: "per", email: "email@email.com", aprovalStatus: "Avslått", aprovalDate: null, registerDate: new Date()},{id: crypto.randomUUID(), name: "Ole", email: "email@email.com", aprovalStatus:"Ingen", aprovalDate: null, registerDate: new Date() }],
        waitinglistParticipants: [{id: crypto.randomUUID(), name: "Nils", email: "email@email.com", aprovalStatus:"Ingen", aprovalDate: null, registerDate: new Date()},{id: crypto.randomUUID(), name: "per", email: "email@email.com", aprovalStatus:"Ingen", aprovalDate: null, registerDate: new Date()},{id: crypto.randomUUID(), name: "Ole", email: "email@email.com", aprovalStatus:"Ingen", aprovalDate: null, registerDate: new Date()}],
        maxParticipants: 20,
        recejectedParticipants: []
    },]

    const status = {
        loading: false
    }
    //Delete


    /*const {data, status, getOne, remove} = useEvents()*/
    const isAdmin: boolean = true //<- sjekk om admin

    const { id } = useParams()
    const [signUp, setSignUp] = useState(false)

    const handleSignUpClick = () => {
        setSignUp(true)
    }

    const handleNoParticipants = () => {
        setSignUp(false)
    }

    useEffect(() => {
        //getOne(id)
    }, [id])

    return (
        <section id="eventPage">
                {status.loading ? (<div className="loader" id="eventPageLoader"></div>) : (
                    <div>
                        <article>
                            <EventHeaderCategoryAndDate header={data[0].name} category={data[0].category} date={data[0].date}/>
                            <EventBody body={data[0].body}/>
                            <EventPriceAdressAndParticipants price={data[0].price} adress={data[0].address} participants={data[0].participants.length} maxParticipants={data[0].maxParticipants}/>
                            <button id="signUpButton" className="button" onClick={handleSignUpClick}>Meld deg på</button>
                            {signUp ? <EventRegisterParticipants occationID={data[0].id} price={data[0].price} onNoParticipants={handleNoParticipants}/> : ""}
                        </article>
                        {isAdmin ? (
                            <EventPageAdminPanel occasion={data[0]}/>
                        ): ("")}
                        
                    </div>
                ) }
        </section>
    )
}




// *Ett* event (Skisse Arrangement-side)

// Tar i bruk services her, @features/events/services/...

// og sender *ferdig* prosessert data videre til Componentet @/features/events/pages/event.tsx
// blir f.eks:
//  import HabitPage from @/features/pages/events/event



