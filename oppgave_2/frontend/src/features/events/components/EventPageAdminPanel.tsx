"use client";
import Link from "next/link";
import { adminParticipantAction, Occasion, participantApprovalStatus, participantStatus } from "../types";
import RegisteredParticipantCard from "./RegisteredParticipantCard";
import { Participant } from "@/types/Types";
import { useEffect, useState } from "react";
import { boolean } from "zod";
import AdminParticipantFormCard from "./AdminParticipantFormCard";


type EventPageAdminPanelProps = {
    occasion: Occasion,
}



export default function EventPageAdminPanel({occasion}: EventPageAdminPanelProps){

    //const {update, status, remove} = useEvents()
    const [adminAssignedParticipants, setAdminAssignedParticipants] = useState<Participant[]>([{id: crypto.randomUUID(), name: "", email: "", aprovalStatus: "Ingen", aprovalDate: null, registerDate: new Date()}])
    const [isAddParticipant, setIsAddParticipant] = useState<boolean>(false)
    const [message, setmessage] = useState("")
    const [error, setErrror] = useState(false)


    const handleDeleteOccasion = () => {
        
        //remove(occasion.id)
    }

    const handleSubmittParticipants = () =>  {
        const participantHasEmbtyFields = adminAssignedParticipants.find(participant => !(participant.name.length >= 2) || !participant.email);

        if(participantHasEmbtyFields){
            setErrror(true)
            setmessage("Alle deltagere må ha gyldig navn og epost")
        } else if (adminAssignedParticipants.length <= 0) {
            setErrror(true)
            setmessage("Du må ha minst en deltager å melde på")
        } else {
            setErrror(false)
            //While there is room for new participants add them to the occassions participant list:
            setAdminAssignedParticipants(prevParticipants => {
                const updatedParticipants = [...prevParticipants];
                while (
                    (!occasion.maxParticipants || occasion.participants.length < occasion.maxParticipants) &&
                    updatedParticipants.length > 0
                ) {
                    const participantToAdd = updatedParticipants.shift();
                    if (participantToAdd) {
                        if(participantToAdd.aprovalStatus === "Godkjent"){
                            participantToAdd.aprovalDate = new Date()
                        }
                        occasion.participants.push(participantToAdd); 
                    }
                }
                return updatedParticipants;
            });

            setmessage("Deltagere lagt til arrangementet")

            //if occassion has waitinglist place remaining admin added participants in it
            if(occasion.waitinglist){
                while(adminAssignedParticipants.length > 0){
                    const participantToAdd = adminAssignedParticipants.shift()
                    if (participantToAdd){
                        if(participantToAdd.aprovalStatus === "Godkjent"){
                            participantToAdd.aprovalDate = new Date()
                        }
                        occasion.waitinglistParticipants.push(participantToAdd)
                    }  
                }
                setmessage("Alle deltagere som har plass er blitt lagt til arrangementet. Resten er satt på venteliste.")
            } else if (adminAssignedParticipants.length > 0 && occasion.maxParticipants) {
                //If occasion does not have a waiting list reject all participants there is no room for
                while(adminAssignedParticipants.length > 0){
                    const participantToAdd = adminAssignedParticipants.shift()
                    if (participantToAdd){
                        participantToAdd.aprovalStatus = "Avslått"
                        participantToAdd.aprovalDate = null
                        occasion.recejectedParticipants.push(participantToAdd)
                    }  
                }
                setmessage("Alle deltagere som har plass er blitt lagt til arrangementet. Resten er avslått.")
            }

            //update(Occassion)
        }
    }

    const handleAddParticipant = () => {
        if (isAddParticipant){
            setAdminAssignedParticipants([...adminAssignedParticipants, {id: crypto.randomUUID(), name: "", email: "", aprovalStatus: "Ingen", aprovalDate: null, registerDate: new Date()}] ) 
        } else {
            setIsAddParticipant(true)
        } 
    }

    const handleParticipantOptionComit = (option: adminParticipantAction, participant: Participant, previousStatus: participantStatus) => {

        //Participant
        if(previousStatus === "Deltager"){
            if(option == "Slett"){
                participant.aprovalDate = null
                occasion.participants = occasion.participants.filter(p => p !== participant);
            } else if (option == "Avslå"){
                participant.aprovalDate = null
                occasion.participants = occasion.participants.filter(p => p !== participant);
                occasion.recejectedParticipants.push(participant)
            } else if (option == "Godkjenn"){
                participant.aprovalDate = new Date()
            }

            //Rejected
        } else if(previousStatus === "Avslått") {
            if(option == "Godkjenn"){
                occasion.recejectedParticipants = occasion.recejectedParticipants.filter(p => p !== participant)
                participant.aprovalDate = new Date()
                if(occasion.maxParticipants && occasion.participants.length < occasion.maxParticipants){
                    occasion.participants.push(participant)
                } else if (occasion.waitinglist) {
                    occasion.waitinglistParticipants.push(participant)
                } else {
                    occasion.recejectedParticipants.push(participant)
                }
            } else if (option == "Slett") {
                occasion.recejectedParticipants = occasion.recejectedParticipants.filter(p => p !== participant)
            }

            //Waiting list
        } else if (previousStatus === "Venteliste"){
            if (option === "Godkjenn") {
                participant.aprovalDate = new Date()
                if (occasion.maxParticipants && occasion.maxParticipants < occasion.participants.length){
                    occasion.waitinglistParticipants = occasion.waitinglistParticipants.filter(p => p !== participant)
                    occasion.participants.push(participant)
                }
            }
            else if (option == "Slett") {
                participant.aprovalDate = null
                occasion.waitinglistParticipants = occasion.waitinglistParticipants.filter(p => p !== participant)
            } else if (option == "Avslå"){
                participant.aprovalDate = null
                occasion.waitinglistParticipants = occasion.waitinglistParticipants.filter(p => p !== participant)
                occasion.recejectedParticipants.push(participant)
            }
        }

        // updateEvent(occasion)
    }

    const handleAdminAddedParticipantDelete = (participantToDelete: Participant) => {
        setAdminAssignedParticipants(prevParticipants =>
            prevParticipants.filter(participant => participant.id !== participantToDelete.id))
    }

    return(
        <section id="eventPageAdminPanel">
            <h2 id="eventPageAdminPanelHeader">Admin panel</h2>
            <div id="editDeleteDownloadEventButtons">
                <Link href={`/opprett/arrangement/${occasion.id}`} className="button">Rediger innhold</Link>
                <Link href={`/arrangement/${occasion.id}/lastned`} className="button">Last ned statistikk</Link>
                <button className="button delete" onClick={handleDeleteOccasion}>Slett arrangement</button>
            </div>
            <div id="eventPageAdminPanelProfit">
                <p id="eventPageAdminPanelProfitProfits">{`${occasion.price * (occasion.participants.length)}`} kr </p>
                <p id="eventPageAdminPanelProfitText">samlet forventet intekt</p>
            </div>
            
            <section id="eventPageAdminPanelParticipants">
                <h3>Påmeldte deltagere:</h3>
                {occasion.participants.map((participant, index) => (
                    <RegisteredParticipantCard
                        key={`participants${index}`}
                        participant={participant}
                        status={"Deltager"}
                        onOptionComit={handleParticipantOptionComit}
                    />
                ))}

                {occasion.waitinglistParticipants.map((participant, index) => (
                    <RegisteredParticipantCard
                        key={`Waiting list${index}`}
                        participant={participant}
                        status={"Venteliste"}
                        onOptionComit={handleParticipantOptionComit}
                    />
                ))}
                {occasion.recejectedParticipants.map((participant, index) => (
                    <RegisteredParticipantCard
                        key={`rejected list${index}`}
                        participant={participant}
                        status={"Avslått"}
                        onOptionComit={handleParticipantOptionComit}
                    />
                ))}
            </section>
            <section id="eventPageAdminPanelAdminParticipants">
                <div id="eventPageAdminPanelAdminParticipantsForms">
                    {isAddParticipant ? (adminAssignedParticipants.map((particpant, index) => (
                        <AdminParticipantFormCard key={`adminParticipantFormCard${index}`} participant={particpant} onDelete={handleAdminAddedParticipantDelete}/> 
                    ))) : ""}
                    
                </div>
                <p className={error ? `error` : `message`}>{message}</p>
                <div id="eventPageAdminPanelAdminParticipantsButtons">
                    <button className="button" onClick={handleAddParticipant}>Legg til deltager</button>
                    {isAddParticipant ? <button className="button" onClick={handleSubmittParticipants}>Meld på deltagere</button> : ""}
                </div>
            </section>
        </section>
    )
}