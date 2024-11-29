"use client";

type EventBodyProps = {
    body: string[]
}

export default function EventBody({body}: EventBodyProps) {

    return(
        <section id="eventPageBody">
            {body.map((text, index) => (
                <p className="eventPageBodyParagraph" key={`eventPageBodyParagraph${index}`}>{text}</p>
            ))}
        </section>
    )

}