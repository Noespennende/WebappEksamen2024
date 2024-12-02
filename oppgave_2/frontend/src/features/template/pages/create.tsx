'use client';

import { useEffect } from 'react';
import { useTemplateForm } from '../hooks/useTemplateForm';
import { CreateTemplate } from '../types';
import { Weekday } from '@/types/Types';
import { WeekdayEnum } from '@/helpers/schema';
import { useTemplate } from '@/hooks/useTemplate';

export default function CreateTemplatePage() {
  const initialValues = {
    name: '',
    isPrivate: false,
    allowSameDayEvent: false,
    waitList: false,
    fixedPrice: false,
    price: 0,
    limitedParticipants: false,
    maxParticipants: 1,
    fixedWeekdays: [], 
  };

  const { fields, handleInputChange, handleWeekdayChange, handleSubmit } = useTemplateForm(initialValues);
  
  //const { status, data, error, add } = useTemplate()

  const { create } = useTemplate()

  const onSubmit = (data: any) => {

    const validatedData = handleSubmit(data)

    if (!validatedData || !validatedData.success) {
        console.log("Validation failed or no validated data:", validatedData?.error);
        return;
    }

    
    if (validatedData.success) {

      const wrappedData = [validatedData.data]
      
      console.log("Data sent for post ", wrappedData)
      create(wrappedData); 

      } else {
        //console.error("Validation failed:", validatedData.error.format());
        //console.log(error)
      }
  }

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  return (
    <>
      <h1>Opprett mal</h1>

      <section className="templateForm">
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="name">Navn</label>
            <input
              id="name"
              type="text"
              value={fields.name.value}
              onChange={(e) => handleInputChange(e, 'name')}
              placeholder="Min mal"
            />
            {fields.name.error && <span style={{ color: 'red' }}>{fields.name.error}</span>}
          </div>

          <div>
            <label htmlFor="isPrivate">Sett malen til privat</label>
            <input
              id="isPrivate"
              type="checkbox"
              checked={fields.isPrivate.value}
              onChange={(e) => handleInputChange(e, 'isPrivate')}
            />
          </div>

          <div>
            <label htmlFor="allowSameDay">Tillat andre arrangement på samme dag</label>
            <input
              id="allowSameDay"
              type="checkbox"
              checked={fields.allowSameDayEvent.value}
              onChange={(e) => handleInputChange(e, 'allowSameDayEvent')}
            />
          </div>

          <div>
            <label htmlFor="waitList">Tillat venteliste</label>
            <input
              id="waitList"
              type="checkbox"
              checked={fields.waitList.value}
              onChange={(e) => handleInputChange(e, 'waitList')}
            />
          </div>

          <div>
            <label htmlFor="fixedPrice">Fast pris</label>
            <input
              id="fixedPrice"
              type="checkbox"
              checked={fields.fixedPrice.value}
              onChange={(e) => handleInputChange(e, 'fixedPrice')}
            />
            {fields.fixedPrice.value && fields.price.error && (
            <span style={{ color: 'red' }}>{fields.price.error}</span>
                )}
            <div className={fields.fixedPrice.value ? '' : 'grayed-out'}>
              <label htmlFor="price">Pris</label>
              <input
                id="price"
                type="number"
                value={fields.price.value}
                onChange={(e) => handleInputChange(e, 'price')}
                placeholder="Pris"
                disabled={!fields.fixedPrice.value}
              />
            </div>
          </div>

          <div>
            <label htmlFor="limitedParticipants">Begrens antall plasser</label>
            <input
              id="limitedParticipants"
              type="checkbox"
              checked={fields.limitedParticipants.value}
              onChange={(e) => handleInputChange(e, 'limitedParticipants')}
            />
            <div className={fields.limitedParticipants.value ? '' : 'grayed-out'}>
              <label htmlFor="maxParticipants">Max plasser</label>
              <input
                id="maxParticipants"
                type="number"
                value={fields.maxParticipants.value}
                onChange={(e) => handleInputChange(e, 'maxParticipants')}
                placeholder="Max plasser"
                disabled={!fields.limitedParticipants.value}
              />
              {fields.maxParticipants.error && <span style={{ color: 'red' }}>{fields.maxParticipants.error}</span>}
            </div>
          </div>

          <div>
        
        <div>
          <label>Lås mal til bestemte ukedager</label>
          {WeekdayEnum.options.map((day) => (
            <div key={day}>
              <input
                type="checkbox"
                id={day}
                checked={fields.fixedWeekdays.value.includes(day as Weekday)}
                onChange={() => handleWeekdayChange(day as Weekday)}  
              />
              <label htmlFor={day}>{day}</label>
            </div>
          ))}
        </div>
      </div>
          
          <button type="submit">Opprett mal</button>
        </form>
      </section>
    </>
  );
}
