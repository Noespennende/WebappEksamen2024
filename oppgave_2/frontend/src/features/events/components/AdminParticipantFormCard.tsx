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
    const [buttonText, setButtonText] = useState((participant.approvalStatus === "Ingen") ? "Velg handling" : participant.approvalStatus)

    

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

    const handleStatusChange = (e, option: adminParticipantAction) => {
        e.preventDefault()

        if(option === "Velg handling"){
            participant.approvalStatus = "Ingen"
            setButtonText("Velg handling")
        } else if (option === "Godkjenn"){
            participant.approvalStatus = "Godkjent"
            setButtonText("Godkjent")
        } else if (option === "Avslå") {
            participant.approvalStatus = "Avslått"
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
                    <label htmlFor="adminParticipantFormCardEmail">Epost</label>
                    <input type="text" id="adminParticipantFormCarEmail" value={participant.email} onChange={handleEmailChange} name="adminParticipantFormCarEmail" placeholder="navn@email.no..."/>
                </div>
            </form>
            <button className={`adminParticipantFormCardDropdownButton ${participant.approvalStatus}`}>{buttonText}</button>
            <ul className="dropdownOptions">
                <li onClick={(e) => handleStatusChange(e, "Velg handling")} className="choseAction">Velg handling</li>
                <li  onClick={(e) => handleStatusChange(e, "Godkjenn")} className="approved">Godkjenn</li>
                <li  onClick={(e) => handleStatusChange(e, "Avslå")} className="denied">Avslå</li>
                <li  onClick={(e) => handleStatusChange(e, "Slett")} className="delete">Slett</li>
            </ul>
        </div>
    )
}