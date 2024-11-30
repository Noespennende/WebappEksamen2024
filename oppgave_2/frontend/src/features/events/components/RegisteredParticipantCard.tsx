"use client";

import { Participant } from "@/types/Types";
import { adminParticipantAction, participantApprovalStatus, participantStatus, } from "../types";
import { participantAprovalStatusEnum } from "@/helpers/schema";
import { useState } from "react";

type registeredParticipantCardProps = {
    participant: Participant,
    status: participantStatus
    onOptionComit: (action: adminParticipantAction) => void
}

export default function RegisteredParticipantCard ({participant, status, onOptionComit}: registeredParticipantCardProps){

    const [buttonText, setButtonText] = useState((participant.aprovalStatus === "Ingen") ? "Velg handling" : participant.aprovalStatus)

    const handleCategoryClick = (option: adminParticipantAction) => {

        if(option === "Velg handling"){
            setButtonText("Velg handling")
        } else if (option === "Godkjenn"){
            setButtonText("Godkjent")
        } else if (option === "Avslå") {
            setButtonText("Avslått")
        } 
        onOptionComit(option)       
    }

    return(
        <article className="RegisteredParticipantCard">
            <h4 className="RegisteredParticipantCardName">{participant.name}</h4>
            <p className="RegisteredParticipantCardEmail">{participant.email}</p>
            <p className="RegisteredParticipantCardStatus">{status}</p>
            <button className={`RegisteredParticipantCardStatusDropdownButton ${participant.aprovalStatus}`}>{buttonText}</button>
            <ul className="dropdownOptions">
                <li onClick={() => handleCategoryClick("Velg handling")} className="choseAction">"Velg handling"</li>
                <li  onClick={() => handleCategoryClick("Godkjenn")} className="approved">Godkjenn</li>
                <li  onClick={() => handleCategoryClick("Avslå")} className="denied">Avslå</li>
                <li  onClick={() => handleCategoryClick("Slett")} className="delete">Slett</li>
            </ul>
        </article>
    )

}