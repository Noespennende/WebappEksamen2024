"use client";
import Dropdown from "./Dropdown";
import {Month ,categories } from "@/types/Types"
import YearSortInput from "./YearSortInput";

export default function HomePageSort(){

    const handleMonthDropdownClick = (month: String) => {
        const monthEnum = Object.keys(Month).find((key) => Month[key as keyof typeof Month] === month)
        console.log(monthEnum)
    }

    const handleYearInput = (yearInput: number) => {
        if(yearInput > 999){

        }
    }

    const handleCategorySelect = (category: String) => {

    }

    return(
        <section id="frontPageSort">
            <h3>Sorter</h3>
            <Dropdown defaultText="Måned" options={Object.values(Month)} onCategorySelect={handleMonthDropdownClick}/>
            <YearSortInput onInput={handleYearInput}/>
            <Dropdown defaultText="Kategori" options={Object.values(categories)} onCategorySelect={handleCategorySelect}/>
        </section>
    )
}