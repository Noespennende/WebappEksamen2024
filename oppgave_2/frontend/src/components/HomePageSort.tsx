"use client";
import { Month, OccasionCategory } from "@/types/Types";
import Dropdown from "./Dropdown";
import YearSortInput from "./YearSortInput";
import { MonthEnum, OccasionCategoryEnum } from "@/helpers/schema";

type homePageSortProps = {
    currentMonth: string | null
    currentYear: string | null,
    currentCategory: string | null,
    onMonthSort: (month: string) => void,
    onYearSort: (year: number) => void,
    onCategorySort: (category: string) => void;
}

export default function HomePageSort({currentMonth,currentYear, currentCategory, onMonthSort, onYearSort, onCategorySort}: homePageSortProps){


    const handleMonthDropdownClick = (month: string) => {
        onMonthSort(month)
    }

    const handleYearInput = (yearInput: number) => {
        if(yearInput > 999){
            onYearSort(yearInput)
        } else if (yearInput < 10){
            onYearSort(0)
        }
    }

    const handleCategorySelect = (eventCategory: string) => {
        onCategorySort(eventCategory)
    }

    return(
        <section id="homePageSort">
            <h3>Sorter:</h3>
            <Dropdown defaultText="Måned" startingCategory={currentMonth} options={MonthEnum.options} onCategorySelect={handleMonthDropdownClick}/>
            <YearSortInput startingYear={currentYear} onInput={handleYearInput}/>
            <Dropdown defaultText="Kategori" startingCategory={currentCategory} options={OccasionCategoryEnum.options} onCategorySelect={handleCategorySelect}/>
        </section>
    )
}

