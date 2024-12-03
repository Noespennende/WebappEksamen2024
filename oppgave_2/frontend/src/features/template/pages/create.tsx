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

  const { create, error } = useTemplate()

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

      console.log(error)

      } else {
        //console.error("Validation failed:", validatedData.error.format());
        //console.log(error)
      }
  }

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  return (
    <section id="createTemplatePage">
        <h1>Opprett mal</h1>

        <section className="templateForm">
          <form onSubmit={onSubmit}>
            <div id="templateName">
              <label htmlFor="name">Navn</label>
              <input
                id="name"
                type="text"
                value={fields.name.value}
                onChange={(e) => handleInputChange(e, 'name')}
                placeholder="Min mal"
                maxLength={20}
              />
              {fields.name.error && <span className="error">{fields.name.error}</span>}
            </div>

            <div>
              <input
                id="isPrivate"
                className='checkbox'
                type="checkbox"
                checked={fields.isPrivate.value}
                onChange={(e) => handleInputChange(e, 'isPrivate')}
              />
              <label htmlFor="isPrivate">Sett malen til privat</label>
            </div>

            <div>
              <input
                id="allowSameDay"
                className='checkbox'
                type="checkbox"
                checked={fields.allowSameDayEvent.value}
                onChange={(e) => handleInputChange(e, 'allowSameDayEvent')}
              />
              <label htmlFor="allowSameDay">Tillat andre arrangement på samme dag</label>
            </div>

            <div>
              <input
                id="waitList"
                className='checkbox'
                type="checkbox"
                checked={fields.waitList.value}
                onChange={(e) => handleInputChange(e, 'waitList')}
              />
              <label htmlFor="waitList">Tillat venteliste</label>
            </div>

            <div>
              <input
                id="fixedPrice"
                className='checkbox'
                type="checkbox"
                checked={fields.fixedPrice.value}
                onChange={(e) => handleInputChange(e, 'fixedPrice')}
              />
              {fields.fixedPrice.value && fields.price.error && (
              <span className="error">{fields.price.error}</span>
                  )}
              <div className={fields.fixedPrice.value ? '' : 'grayed-out'}>
                <label id="priceLabel" htmlFor="price">Pris</label>
                <input
                  id="price"
                  type="number"
                  value={fields.price.value}
                  onChange={(e) => handleInputChange(e, 'price')}
                  placeholder="Pris"
                  disabled={!fields.fixedPrice.value}
                />
                <label htmlFor="fixedPrice">Fast pris</label>
              </div>
            </div>

            <div>
              <input
                id="limitedParticipants"
                className='checkbox'
                type="checkbox"
                checked={fields.limitedParticipants.value}
                onChange={(e) => handleInputChange(e, 'limitedParticipants')}
              />
              <div className={fields.limitedParticipants.value ? '' : 'grayed-out'}>
                <label id="maxParticipatsLabel" htmlFor="maxParticipants">Max plasser</label>
                <input
                  id="maxParticipants"
                  type="number"
                  value={fields.maxParticipants.value}
                  onChange={(e) => handleInputChange(e, 'maxParticipants')}
                  placeholder="Max plasser"
                  disabled={!fields.limitedParticipants.value}
                />
                {fields.maxParticipants.error && <span className="error">{fields.maxParticipants.error}</span>}
                <label htmlFor="limitedParticipants">Begrens antall plasser</label>
              </div>
            </div>

            <div>
          
          <div id="daysOfTheWeek">
            <label id="weekdaysLabel">Lås mal til bestemte ukedager</label>
            <div id="weekdayColumns">
                {WeekdayEnum.options.map((day) => (
                  <div className="dayColumn" key={day}>
                    <label htmlFor={day}>{day}</label>
                    <input
                      type="checkbox"
                      className='checkbox'
                      id={day}
                      checked={fields.fixedWeekdays.value.includes(day as Weekday)}
                      onChange={() => handleWeekdayChange(day as Weekday)}  
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
            
            <button className="button" type="submit">Opprett mal</button>
          </form>
        </section>
    </section>
  );
}
