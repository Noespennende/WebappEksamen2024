"use client";

type EventPriceAdressAndParticipantsProps = {
    price: number,
    adress: string,
    participants: number,
    maxParticipants?: number
}



export default function EventPriceAdressAndParticipants ({price, adress, participants, maxParticipants}: EventPriceAdressAndParticipantsProps){

    return(
        <section id="eventPriceAdressAndParticipants">
            <p id="eventPagePrice">{price}</p>
            <p id="eventPageAdress">{adress}</p>
            <div id="eventPageParticipants">
                <p id="eventPageParticipantsText">Deltagere</p>
                <div id="eventPageParticipantsCount">
                    <p> {participants}</p>
                    {maxParticipants ? (<p>{`/${maxParticipants}`}</p>) : ("")}
                </div>
                
            </div>
        </section>
    )
}