"use client";

import { useState } from "react";

type yearSortInputProps = {
    onInput: (input: number) => void
}

export default function YearSortInput({onInput}: yearSortInputProps){

    const [value, setValue] = useState("")

    const handleChange = (e) => {
        const input = e.target.value
        e.preventDefault()
        if (/^\d{0,4}$/.test(input)) {
            setValue(input)
            onInput(input);
        }
    }

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