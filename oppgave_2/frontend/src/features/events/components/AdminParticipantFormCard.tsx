"use client";

import { Participant } from "@/types/Types";
import { adminParticipantAction } from "../types";
import { useState } from "react";

type AdminParticipantFormCardProps = {
    participant: Participant,
    onDelete: (participant: Participant) => void
}


export default function AdminParticipantFormCard ({participant, onDelete}: AdminParticipantFormCardProps) {

    const [name, setName] = useState(participant.name)
    const [email, setEmail] = useState(participant.email)
    const [buttonText, setButtonText] = useState((participant.aprovalStatus === "Ingen") ? "Velg handling" : participant.aprovalStatus)

    

    const handleNameChange = (e) => {
        e.preventDefault()
        participant.name = e.target.value
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        e.preventDefault()
        participant.email = e.target.value
        setEmail(e.target.value)
    }

    const handleStatusChange = (option: adminParticipantAction) => {
        if(option === "Velg handling"){
            participant.aprovalStatus = "Ingen"
            setButtonText("Velg handling")
        } else if (option === "Godkjenn"){
            participant.aprovalStatus = "Godkjent"
            setButtonText("Godkjent")
        } else if (option === "Avslå") {
            participant.aprovalStatus = "Avslått"
            setButtonText("Avslått")
        }
        
        if(option === "Slett"){
            setButtonText("Slettet")
            onDelete(participant)
        } 
        
    }

    return(
        <div className="adminParticipantFormCard">
            <form className="adminParticipantFormCardForm">
            <div className="adminParticipantFormCardNameSection">
                <label htmlFor="adminParticipantFormCardName">Navn</label>
                <input type="text" id="adminParticipantFormCarName" value={participant.name} onChange={handleNameChange} name="adminParticipantFormCarName" placeholder="Navn Navnessen..."/>
            </div>
            <div className="adminParticipantFormCardEmailSection">
                <label htmlFor="adminParticipantFormCardEmail">Navn</label>
                <input type="text" id="adminParticipantFormCarEmail" value={participant.email} onChange={handleEmailChange} name="adminParticipantFormCarEmail" placeholder="navn@email.no..."/>
            </div>
        </form>
        <button className={`adminParticipantFormCardDropdownButton ${participant.aprovalStatus}`}>{buttonText}</button>
        <ul className="dropdownOptions">
            <li onClick={() => handleStatusChange("Velg handling")} className="choseAction">"Velg handling"</li>
            <li  onClick={() => handleStatusChange("Godkjenn")} className="approved">Godkjenn</li>
            <li  onClick={() => handleStatusChange("Avslå")} className="denied">Avslå</li>
            <li  onClick={() => handleStatusChange("Slett")} className="delete">Slett</li>
        </ul>
        </div>
    )
}