"use client";

import { useEffect, useState } from "react";

type yearSortInputProps = {
    startingYear: string | null,
    onInput: (input: number) => void
}

export default function YearSortInput({startingYear, onInput}: yearSortInputProps){

    const [value, setValue] = useState("")

    const handleChange = (e) => {
        const input = e.target.value
        e.preventDefault()
        if (/^\d{0,4}$/.test(input)) {
            setValue(input)
            onInput(input);
        }
    }

    useEffect(() => {
        console.log(startingYear)
        if(startingYear && startingYear !== "null"){
            setValue(startingYear)
        } else {
            setValue("")
        }
    }, [startingYear])

    return (
        <div className = "yearSortInput">
            <label htmlFor="yearInput">Year</label>
            <input
                type="text"
                id= "yearInput"
                value={`${value}`}
                onChange={handleChange}
                maxLength={4}
                placeholder = "År"
            />
        </div>
    )
}