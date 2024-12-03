"use client";

import { Participant } from "@/types/Types";
import { adminParticipantAction, participantStatus, } from "../types";
import { useState } from "react";
import { Context } from "vm";

type registeredParticipantCardProps = {
    participant: Participant,
    status: participantStatus,
    onOptionComit: (e: Context, action: adminParticipantAction, participant: Participant, previousStatus: participantStatus) => void
}

export default function RegisteredParticipantCard ({participant, status, onOptionComit,}: registeredParticipantCardProps){

    const [buttonText, setButtonText] = useState((participant.aprovalStatus === "Ingen") ? "Velg handling" : participant.aprovalStatus)

    const handleCategoryClick = (e, option: adminParticipantAction) => {
        e.preventDefault()
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
        onOptionComit(e, option, participant, status)       
    }

    return(
        <article className="RegisteredParticipantCard">
            <h4 className="RegisteredParticipantCardName">{participant.name}</h4>
            <p className="RegisteredParticipantCardEmail">{participant.email}</p>
            <p className="RegisteredParticipantCardStatus">{status}</p>
            <button className={`RegisteredParticipantCardStatusDropdownButton ${participant.aprovalStatus}`}>{buttonText}</button>
            <ul className="dropdownOptions">
                <li  onClick={(e) => {e.preventDefault(); handleCategoryClick(e, "Velg handling")}} className="choseAction">Velg handling</li>
                <li  onClick={(e) => {e.preventDefault();handleCategoryClick(e, "Godkjenn")}} className="approved">Godkjenn</li>
                <li  onClick={(e) => {e.preventDefault();handleCategoryClick(e, "Avslå")}} className="denied">Avslå</li>
                <li  onClick={(e) => {e.preventDefault();handleCategoryClick(e, "Slett")}} className="delete">Slett</li>
            </ul>
        </article>
    )

}