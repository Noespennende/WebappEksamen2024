"use client";

import { Participant } from "@/types/Types"
import { useEffect, useState } from "react"
import EventRegisterParticipantForm from "./EventParticipantRegistrationForm"

type EventRegisterParticipantsProps = {
    occationID: string,
    price: number,
    onNoParticipants: () => void
}

export default function EventRegisterParticipants({occationID, price, onNoParticipants}: EventRegisterParticipantsProps){

    //const {status, add, error} = useEvents()
    const [participants, setParticipants] = useState<Participant[]>([
        {id: crypto.randomUUID(), name: "", email: "",  aprovalStatus: "Ingen", aprovalDate: null, registerDate: new Date()}
    ])
    const combinedPrice = price * participants.length
    const [errorMessage, setErrorMessage] = useState("")

    const handleAddParticipantClick = () => {
        setParticipants([...participants, {id: crypto.randomUUID(), name: "", email: "", aprovalStatus: "Ingen", aprovalDate: null, registerDate: new Date()}] ) 
        setErrorMessage("")
    }

    const handleDeleteParticipantClick = (index: number) => {
        setErrorMessage("")
        setParticipants(previousParticipants => 
            previousParticipants.filter((_, i) => i !== index)
        );
    }

    const handleParticipantFormNameChange = (index: number, input: string) => {
        participants[index].name = input
    }

    const handleParticipantFormEmailChange = (index: number, input: string) => {
        participants[index].email = input
    }


    const handleSubmitt = () => {
        const participantHasEmbtyFields = participants.find(participant => !(participant.name.length >= 2)|| !participant.email);

        if(participantHasEmbtyFields){
            setErrorMessage("Alle deltagere må ha gyldig navn og epost")
        } else if (participants.length <= 0) {
            setErrorMessage("Du må ha minst en deltager å melde på")
        } else {
            setErrorMessage("")
            //add(occationID, participants)
        }
    }

    useEffect(() => {
        console.log(participants)
        if (participants.length <= 0) {
            onNoParticipants(); 
        }
    })

    return(
        <section id="eventRegisterParticipants">
            {participants.map((participant, index) => (
                    <EventRegisterParticipantForm key={`registrationForm${index}`}
                    index={index} onNameInput={handleParticipantFormNameChange}
                    onEmailInput={handleParticipantFormEmailChange}
                    onDelete={handleDeleteParticipantClick}
                    participant={participant}/> 
                ))}
                
            <div id="combinedPrice">
                <p id="combinedPriceText">Samplet pris:</p>
                <p id="combinedPriceAmount">{`${combinedPrice},-`}</p>
            </div>
            {errorMessage.length > 0 ?  <p className="errorMessage">{errorMessage}</p> : ""}
            <div id="addParticipantAndSendRegistrationButtons">
                <button className="button" onClick={handleAddParticipantClick}>Legg til deltager</button>
                <button className="button" onClick={handleSubmitt}>Send påmelding</button>
            </div>
        </section>
    )
}