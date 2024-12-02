"use client";
import { useState } from "react"

type dropdownProps = {
    defaultText: string,
    options: string[],
    onCategorySelect: (selectedCategory: string) => void;
}

export default function Dropdown({defaultText, options, onCategorySelect} : dropdownProps) {

    const [buttonText, setButtonText] = useState(defaultText)



    const handleCategoryClick = (selectedCategory: string) => {
        setButtonText(selectedCategory)
        onCategorySelect(selectedCategory)
    }

    return (
        <div className = "dropdown">
            <button className="dropdownButton">{buttonText}</button>
            <ul className="dropdownOptions">
                <li onClick={() => handleCategoryClick(defaultText)}>Ingen sortering</li>
                {options.map((option, index) => (
                    <li key={`${option}`+`${index}`} onClick={() => handleCategoryClick(option)}>{option}</li>
                )
            )}
            </ul>
        </div>
    )
}
