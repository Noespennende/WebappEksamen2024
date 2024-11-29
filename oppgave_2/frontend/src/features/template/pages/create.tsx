'use client';

import { useState } from 'react';
import { validateCreateTemplate } from '../types';

export default function CreateTemplate() {
  const [name, setName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [allowSameDayEvent, setAllowSameDayEvent] = useState(false);
  const [waitList, setWaitList] = useState(false);
  const [fixedPrice, setFixedPrice] = useState(false);
  const [price, setPrice] = useState(0);
  const [limitedParticipants, setLimitedParticipants] = useState(false);
  const [maxParticipants, setMaxParticipants] = useState(0);

  const handleSubmit = () => {
    const templateData = {
        name,
        allowSameDayEvent,
        waitList,
        fixedPrice,
        ...(fixedPrice ? { price } : {}),
        limitedParticipants,
    
        ...(limitedParticipants ? { maxParticipants } : {}),
        setPrice: fixedPrice,
        isPrivate,
      };


      console.log('Template data:', templateData);

      const validationResult = validateCreateTemplate(templateData);
      
      if (!validationResult.success) {

        console.log("Validation failed:", validationResult.error.errors);
        return;
      }

  };

  return (
    <>
      <h1>Opprett mal</h1>

      <div>
        <label htmlFor="name">Navn</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Min mal"
        />
      </div>

      <div>
        <label htmlFor="isPrivate">Sett malen til privat</label>
        <input
          id="isPrivate"
          type="checkbox"
          checked={isPrivate}
          onChange={() => setIsPrivate(!isPrivate)}
        />
      </div>

      <div>
        <label htmlFor="allowSameDay">Tillat andre arrangement på samme dag</label>
        <input
          id="allowSameDay"
          type="checkbox"
          checked={allowSameDayEvent}
          onChange={() => setAllowSameDayEvent(!allowSameDayEvent)}
        />
      </div>

      <div>
        <label htmlFor="waitList">Tillat venteliste</label>
        <input
          id="waitList"
          type="checkbox"
          checked={waitList}
          onChange={() => setWaitList(!waitList)}
        />
      </div>

      <div>
        <label htmlFor="fixedPrice">Fast pris</label>
        <input
          id="fixedPrice"
          type="checkbox"
          checked={fixedPrice}
          onChange={() => setFixedPrice(!fixedPrice)}
        />
        <div className={fixedPrice ? '' : 'grayed-out'}>
          <label htmlFor="price">Pris</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Pris"
            disabled={!fixedPrice}
          />
        </div>
      </div>

      <div>
        <label htmlFor="limitParticipants">Begrens antall plasser</label>
        <input
          id="limitParticipants"
          type="checkbox"
          checked={limitedParticipants}
          onChange={() => setLimitedParticipants(!limitedParticipants)}
        />
        <div className={limitedParticipants ? '' : 'grayed-out'}>
          <label htmlFor="maxParticipants">Max plasser</label>
          <input
            id="maxParticipants"
            type="number"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(Number(e.target.value))}
            placeholder="Max plasser"
            disabled={!limitedParticipants}
          />
        </div>
      </div>

      <button onClick={handleSubmit}>Opprett mal</button>
    </>
  );
}
