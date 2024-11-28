"use client";
type yearSortInputProps = {
    onInput: (input: number) => void
}

export default function YearSortInput({onInput}: yearSortInputProps){

    const handleChange = (e) => {
        e.preventDefault()
        onInput(e.target.value)
    }

    return (
        <div className = "yearSortInput">
            <label htmlFor="yearInput">Year</label>
            <input
                type="number"
                id= "yearInput"
                onChange={handleChange}
                maxLength={4}
                placeholder = "År"
            />
        </div>
    )
}