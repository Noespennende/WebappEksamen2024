"use client";
import Link from "next/link";
import { adminParticipantAction, Occasion } from "../types";
import RegisteredParticipantCard from "./RegisteredParticipantCard";


type EventPageAdminPanelProps = {
    occasion: Occasion,
}



export default function EventPageAdminPanel({occasion}: EventPageAdminPanelProps){

    //const {status, remove} = useEvents()

    const handleDelete = () => {
        //remove(occasion.id)
    }

    const handleParticipantOptionComit = (option: adminParticipantAction) => {
        //Skriv
    }

    return(
        <section id="eventPageAdminPanel">
            <h2 id="eventPageAdminPanelHeader">Admin panel</h2>
            <div id="editDeleteDownloadEventButtons">
                <Link href={`/opprett/arrangement/${occasion.id}`} className="button">Rediger innhold</Link>
                <Link href={`/arrangement/${occasion.id}/lastned`} className="button">Rediger innhold</Link>
                <button className="button delete">Slett arrangement</button>
            </div>
            <h3>Påmeldte deltagere</h3>
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
    )
}