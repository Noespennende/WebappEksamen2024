"use client";
import { useState } from "react"

type dropdownProps = {
    defaultText: String,
    options: String[],
    onCategorySelect: (selectedCategory: String) => void;
}

export default function Dropdown({defaultText, options, onCategorySelect} : dropdownProps) {

    const [buttonText, setButtonText] = useState(defaultText)



    const handleCategoryClick = (selectedCategory: String) => {
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
