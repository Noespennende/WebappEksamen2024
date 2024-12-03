import { OccasionCategory } from "@/types/Types"

type EventHeaderCategoryAndDateProps = {
    header: string,
    category: OccasionCategory,
    date: Date
}


export default function EventHeaderCategoryAndDate({header,category, date}: EventHeaderCategoryAndDateProps){
    const occasionDate = typeof date === "string" ? new Date(date) : date;

    const day =  date.toLocaleString("nb-NO", { day: "2-digit" }).replace(/\./g, "")
    const month = date.toLocaleString("nb-NO", {month: "short"}).toLocaleUpperCase()
    const year = occasionDate.getFullYear()


    return(
        <section id="eventHeaderCategoryAndDate">
            <h1 id="eventPageHeader">{header}</h1>
            <div id="eventPageCategoryAndDate">
                <p id="eventPageCategory">{category}</p>
                <p id="eventPageDate">{`${day} ${month} ${year}`}</p>
            </div>
        </section>
    )
}