"use client";

import { useEventForm } from '@/features/events/hooks/useEventForm';
import { useTemplate } from '@/hooks/useTemplate';
import { useEffect, useState } from 'react';

export default function CreateEventPage() {
  const initialValues = {
    name: '',
    template: '',
    isPrivate: false,
    allowSameDayEvent: false,
    waitList: false,
    fixedPrice: false,
    price: 0,
    limitedParticipants: false ,
    maxParticipants: 0,
    fixedWeekdays: [],
    date: '', 
    category: '',
    slug: '',
    description: '',
  };

  const events = [ 
    {
      name: "Football Tournament",
      date: new Date("2024-12-10T14:00:00"),
      template: "sports-event-template",
    }, 
    {
      name: "Tech Meet-Up",
      date: new Date("2024-12-15T18:00:00"),
      template: "d08e3d69-4695-41e4-a3b6-9c245ab3d5c8",
    }
  ];


  const { fields, handleInputChange, handleSubmit, setFieldValue } = useEventForm(initialValues, events);

  
  
  

  const templates = [
    {
      id: '1d3a9f83-2f5d-4b3c-9443-f24d9cb9bb00',
      name: 'Standard Arrangement',
      price: 300,
      maxParticipants: undefined,
      isPrivate: false,
      fixedPrice: true,
      allowSameDayEvent: true,
      waitList: false,
      limitedParticipants: false,
      fixedWeekdays: ["Monday", "Wednesday", "Friday"],
    },
    {
      id: '3b8adf93-20a7-4f35-94fa-bc072f9d52ea',
      name: 'VIP Event',
      price: undefined,
      maxParticipants: 20,
      isPrivate: true,
      fixedPrice: false,
      allowSameDayEvent: false,
      waitList: true,
      limitedParticipants: true,
      fixedWeekdays: ["Thursday", "Saturday"],
    },
    {
      id: 'd08e3d69-4695-41e4-a3b6-9c245ab3d5c8',
      name: 'Workshop for Developers',
      price: 150,
      maxParticipants: undefined,
      isPrivate: false,
      fixedPrice: true,
      allowSameDayEvent: false,
      waitList: false,
      limitedParticipants: false,
      fixedWeekdays: [],
    },
  ];

  const categories = ["Sport", "Social", "Meeting", "Other"];



  const templateOptions = templates.map(template => ({
    id: template.id,
    name: template.name
  }));
  const categoryOptions = categories;

  const onSubmit = (data: React.FormEvent) => {

    const validatedData = handleSubmit(data)

    if (!validatedData || !validatedData.success) {
        console.log("Validation failed or no validated data:", validatedData?.error);
        return;
    }

    
    if (validatedData.success) {
        
        console.log("test :", validatedData)

      } else {
        //console.error("Validation failed:", validatedData.error.format());
        //console.log(error)
      }
  }

  // Håndter endringen av malen direkte i onChange
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTemplateId = e.target.value;
  
    handleInputChange(e, 'template'); 
  
    console.log(selectedTemplateId)
    if (selectedTemplateId === "") {
      // Nullstiller
      (Object.keys(fields) as Array<keyof typeof fields>).forEach((key) => {
        setFieldValue(key, initialValues[key], false);
      });
      setFieldValue('template', "");  // Ensure template is also reset
      return;
    }
  
    const selectedTemplate = templates.find(template => template.id === selectedTemplateId);
  
    if (selectedTemplate) {
      // Oppdater spesifikke felter basert på valgt mal.
      setFieldValue('template', selectedTemplate.id);
      setFieldValue('price', selectedTemplate.price ?? 0, selectedTemplate.fixedPrice);
      setFieldValue('maxParticipants', selectedTemplate.maxParticipants ?? 0, selectedTemplate.limitedParticipants);
      setFieldValue('isPrivate', selectedTemplate.isPrivate);
      setFieldValue('fixedPrice', selectedTemplate.fixedPrice);
      setFieldValue('allowSameDayEvent', selectedTemplate.allowSameDayEvent, selectedTemplate.allowSameDayEvent);
      setFieldValue('waitList', selectedTemplate.waitList);
      setFieldValue('limitedParticipants', selectedTemplate.limitedParticipants);
      setFieldValue('fixedWeekdays', selectedTemplate.fixedWeekdays);
    }
  };
  

  return (
    <>
      <h1>Opprett arrangement</h1>

      <section className="eventForm">
        <form onSubmit={onSubmit}>

          <div>
            <label htmlFor="template">Velg mal</label>
            <select
              id="template"
              value={fields.template.value || ""}
              onChange={handleTemplateChange}
            >
              <option value="">Ingen</option>
              {templateOptions.map((template, index) => (
                <option key={index} value={template.id}>{template.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date">Velg dato</label>
            <input
              id="date"
              type="date" // Endret fra "text" til "date"
              value={fields.date.value || ''} // Sett initial verdi, håndter null/undefined
              onChange={(e) => handleInputChange(e, 'date')} // Håndter endring
              placeholder="Velg en dato"
            />
            {fields.date.error && <span style={{ color: 'red' }}>{fields.date.error}</span>}
          </div>

          <div>
            <label htmlFor="category">Type</label>
            <select
              id="category"
              value={fields.category.value}
              onChange={(e) => handleInputChange(e, 'category')}
            >
              <option value="">Velg en kategori</option>
              {categoryOptions.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {fields.category.error && (
              <span style={{ color: 'red' }}>{fields.category.error}</span>
            )}
          </div>

          <div>
            <label htmlFor="category">Type</label>
            <input
              id="category"
              type="text"
              value={fields.category.value}
              onChange={(e) => handleInputChange(e, 'category')}
              placeholder="Kategori"
              disabled={fields.slug.disabled}
            />
            {fields.category.error && <span style={{ color: 'red' }}>{fields.category.error}</span>}
          </div>

          <div>
            <label htmlFor="name">Arrangement navn</label>
            <input
              id="name"
              type="text"
              value={fields.name.value}
              onChange={(e) => handleInputChange(e, 'name')}
              placeholder="Kategori"
              disabled={fields.name.disabled}
            />
            {fields.name.error && <span style={{ color: 'red' }}>{fields.name.error}</span>}
          </div>

          <div>
            <label htmlFor="slug">Slug</label>
            <input
              id="slug"
              type="text"
              value={fields.slug.value}
              onChange={(e) => handleInputChange(e, 'slug')}
              placeholder="Slug"
            />
            {fields.slug.error && <span style={{ color: 'red' }}>{fields.slug.error}</span>}
          </div>

          <div>
            <label htmlFor="maxParticipants">Maks deltakere</label>
            <input
              id="maxParticipants"
              type="number"
              value={fields.maxParticipants.value}
              onChange={(e) => handleInputChange(e, 'maxParticipants')}
              placeholder="Maks deltakere"
              disabled={fields.maxParticipants.disabled}
            />
            {fields.maxParticipants.error && <span style={{ color: 'red' }}>{fields.maxParticipants.error}</span>}
          </div>

          <div>
            <label htmlFor="price">Pris</label>
            <input
              id="price"
              type="number"
              value={fields.price.value}
              onChange={(e) => handleInputChange(e, 'price')}
              placeholder="Pris"
              disabled={fields.price.disabled}
            />
            {fields.price.error && <span style={{ color: 'red' }}>{fields.price.error}</span>}
          </div>
          

          <div>
            <label htmlFor="waitList">Tillatt venteliste</label>
            <input
              id="waitList"
              type="checkbox"
              checked={fields.waitList.value}
              onChange={(e) => handleInputChange(e, 'waitList')}
            />
          </div>

          <div>
            <label htmlFor="description">Beskrivelse</label>
            <textarea
              id="description"
              value={fields.description.value || ''}
              onChange={(e) => handleInputChange(e, 'description')}
              placeholder="Beskriv arrangementet"
            />
            {fields.description.error && <span style={{ color: 'red' }}>{fields.description.error}</span>}
          </div>

          <div>
            <button type="submit">Opprett</button>
          </div>
        </form>
      </section>
    </>
  );
}
