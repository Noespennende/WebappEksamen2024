'use client';
import CreateEventPage from '@/features/events/pages/createEvent';
import { useParams } from 'next/navigation';
import React from 'react';

const UpdateOccasion = () => {
    const params = useParams<{ slug: string }>(); 
    const slug = params?.slug;
    return (
      <div>
        <h2>Ape</h2>
        <CreateEventPage courseSlug={slug}/>
      </div>
    );
};


export default UpdateOccasion