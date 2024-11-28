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
                <li onClick={() => handleCategoryClick(defaultText)}>{defaultText}</li>
                {options.map((option, index) => (
                    <li key={`${defaultText}`+`${index}`} onClick={() => handleCategoryClick(option)}></li>
                )
            )}
            </ul>
        </div>
    )
}
