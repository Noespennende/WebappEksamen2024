"use client";
import Dropdown from "./Dropdown";
import YearSortInput from "./YearSortInput";
import { MonthEnum, OccasionCategoryEnum } from "@/helpers/schema";

export default function HomePageSort(){

    const handleMonthDropdownClick = (month: String) => {
        const monthEnum: typeof MonthEnum = Object.keys(MonthEnum).find((key) => MonthEnum[key as keyof typeof MonthEnum] === month)
    }

    const handleYearInput = (yearInput: number) => {
        if(yearInput > 999){

        } else if (yearInput.toString.length <= 0){
            
        }
    }

    const handleCategorySelect = (eventCategory: String) => {
        const eventCategoryEnum: typeof OccasionCategoryEnum = Object.keys(OccasionCategoryEnum).find((key) => OccasionCategoryEnum[key as keyof typeof OccasionCategoryEnum] === eventCategory)
    }

    return(
        <section id="homePageSort">
            <h3>Sorter:</h3>
            <Dropdown defaultText="Måned" options={MonthEnum.options} onCategorySelect={handleMonthDropdownClick}/>
            <YearSortInput onInput={handleYearInput}/>
            <Dropdown defaultText="Kategori" options={OccasionCategoryEnum.options} onCategorySelect={handleCategorySelect}/>
        </section>
    )
}

/*

<Dropdown defaultText="Måned" options={Object.values(MonthEnum)} onCategorySelect={handleMonthDropdownClick}/>
            <YearSortInput onInput={handleYearInput}/>
            <Dropdown defaultText="Kategori" options={Object.values(EventCategoryEnum)} onCategorySelect={handleCategorySelect}/>

            */