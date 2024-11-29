"use client";
import Dropdown from "./Dropdown";
import YearSortInput from "./YearSortInput";
import { MonthEnum, EventCategoryEnum } from "@/helpers/schema";

export default function HomePageSort(){

    const handleMonthDropdownClick = (month: String) => {
        const monthEnum: typeof MonthEnum = Object.keys(MonthEnum).find((key) => MonthEnum[key as keyof typeof MonthEnum] === month)
    }

    const handleYearInput = (yearInput: number) => {
        if(yearInput > 999){

        }
    }

    const handleCategorySelect = (eventCategory: String) => {
        const eventCategoryEnum: typeof EventCategoryEnum = Object.keys(EventCategoryEnum).find((key) => EventCategoryEnum[key as keyof typeof EventCategoryEnum] === eventCategory)
    }

    return(
        <section id="frontPageSort">
            <h3>Sorter</h3>
            <Dropdown defaultText="Måned" options={Object.values(MonthEnum)} onCategorySelect={handleMonthDropdownClick}/>
            <YearSortInput onInput={handleYearInput}/>
            <Dropdown defaultText="Kategori" options={Object.values(EventCategoryEnum)} onCategorySelect={handleCategorySelect}/>
        </section>
    )
}