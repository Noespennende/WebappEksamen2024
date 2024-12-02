"use client";
import { Month, OccasionCategory } from "@/types/Types";
import Dropdown from "./Dropdown";
import YearSortInput from "./YearSortInput";
import { MonthEnum, OccasionCategoryEnum } from "@/helpers/schema";

type homePageSortProps = {
    onMonthSort: (month: string) => void,
    onYearSort: (year: number) => void,
    onCategorySort: (category: string) => void;
}

export default function HomePageSort({onMonthSort, onYearSort, onCategorySort}: homePageSortProps){

    const handleMonthDropdownClick = (month: string) => {
        onMonthSort(month)
    }

    const handleYearInput = (yearInput: number) => {
        if(yearInput > 999){
            onYearSort(yearInput)
        }
    }

    const handleCategorySelect = (eventCategory: string) => {
        onCategorySort(eventCategory)
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

