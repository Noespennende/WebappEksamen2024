import { Participant } from "@/types/Types"
import { useState } from "react"

type EventRegisterParticipantFormProps = {
    index: number,
    participant: Participant
    onDelete: (index: number) => void,
    onNameInput: (index: number, name: string) => void,
    onEmailInput: (index: number, email: string) => void,

}

export default function EventRegisterParticipantForm({index, participant, onDelete, onNameInput, onEmailInput}: EventRegisterParticipantFormProps){
    const participantNumber = (index+1 >= 10) ? `${index+1}` : `0${index+1}`

    const [name, setName] = useState(participant.name)
    
    const handleNameChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
        onNameInput(index, e.target.value)
    }

    return(
        <div className="eventRegisterParticipantForm">
            <div className="eventRegisterParticipantFormParticipantAndNumber">
                <p className="eventRegisterParticipantFormParticipantText">Deltager</p>
                <p className="eventRegisterParticipantFormParticipantNumber">{participantNumber}</p> 
            </div>
            <form>
                <div className="participationFormName">
                    <label htmlFor="participationFormName">Navn</label>
                    <input type="text" id="participationFormName" value={participant.name} onChange={handleNameChange} name="participationFormName" placeholder="Navn Navnessen..."/>
                </div>
                <div className="participationFormEmail">
                    <label htmlFor="participationFormEmail">Epost</label>
                    <input type="email" id="participationFormEmail"  onChange={(e) => onEmailInput(index, e.target.value)} name="participationFormEmail" placeholder="Navn@epost.no..."/>
                </div>
            </form>
            <button className="button" id="eventRegisterParticipantFormButton" onClick={() => onDelete(index)}>Slett</button>
        </div>
    )
}