"use client";

import { useEventForm } from '@/features/events/hooks/useEventForm';

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
    date: '', 
    category: '',
    slug: '',
  };

  const { fields, handleInputChange, handleSubmit, setFieldValue } = useEventForm(initialValues);

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
      allowSameDayEvent: true,
      waitList: false,
      limitedParticipants: false,
      fixedWeekdays: [],
    },
  ];

  const templateOptions = templates.map(template => template.name);


  const onSubmit = (data: React.FormEvent) => {

    const validatedData = handleSubmit(data)

    if (!validatedData || !validatedData.success) {
        console.log("Validation failed or no validated data:", validatedData?.error);
        return;
    }

    
    if (validatedData.success) {
        
        // add-call fra useEvent

      } else {
        //console.error("Validation failed:", validatedData.error.format());
        //console.log(error)
      }
  }

  // Håndter endringen av malen direkte i onChange
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTemplateName = e.target.value;
  
    handleInputChange(e, 'template'); 
  
    if (selectedTemplateName === "") {
      // Nullstiller
      (Object.keys(fields) as Array<keyof typeof fields>).forEach((key) => {
        setFieldValue(key, initialValues[key], false);
      });
      return;
    }
  
    const selectedTemplate = templates.find(template => template.name === selectedTemplateName);
  
    if (selectedTemplate) {
      // Oppdater spesifikke felter basert på valgt mal.
      setFieldValue('price', selectedTemplate.price ?? 0, selectedTemplate.fixedPrice);
      setFieldValue('maxParticipants', selectedTemplate.maxParticipants ?? 0, selectedTemplate.limitedParticipants);
      setFieldValue('isPrivate', selectedTemplate.isPrivate);
      setFieldValue('fixedPrice', selectedTemplate.fixedPrice);
      setFieldValue('allowSameDayEvent', selectedTemplate.allowSameDayEvent, selectedTemplate.allowSameDayEvent);
      setFieldValue('waitList', selectedTemplate.waitList);
      setFieldValue('limitedParticipants', selectedTemplate.limitedParticipants);
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
              value={fields.template.value}
              onChange={handleTemplateChange}
            >
              <option value="">Ingen</option>
              {templateOptions.map((template, index) => (
                <option key={index} value={template}>{template}</option>
              ))}
            </select>
            {fields.template.error && <span style={{ color: 'red' }}>{fields.template.error}</span>}
          </div>

          <div>
            <label htmlFor="date">Velg dato</label>
            <input
              id="date"
              type="text"
              value={fields.date.value}
              onChange={(e) => handleInputChange(e, 'date')}
              placeholder="Dato"
            />
            {fields.date.error && <span style={{ color: 'red' }}>{fields.date.error}</span>}
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
            <label htmlFor="slug">Beskrivelse</label>
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
            <button type="submit">Opprett</button>
          </div>
        </form>
      </section>
    </>
  );
}
