"use client";

import { useParams } from "next/navigation";

export default function Event(){
    const { id } = useParams()

    return (
        <section>
            <div className="loader"></div>
            
        </section>
    )
}




// *Ett* event (Skisse Arrangement-side)

// Tar i bruk services her, @features/events/services/...

// og sender *ferdig* prosessert data videre til Componentet @/features/events/pages/event.tsx
// blir f.eks:
//  import HabitPage from @/features/pages/events/event



