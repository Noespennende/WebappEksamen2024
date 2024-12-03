import { useState } from 'react';

export default function CreateEvent() {
  // Definerer states for input-feltene
  const [name, setName] = useState('');
  const [allowSameDay, setAllowSameDay] = useState(false);
  const [waitList, setWaitList] = useState(false);
  const [fixedPrice, setFixedPrice] = useState(false);
  const [price, setPrice] = useState(0);
  const [limitParticipants, setLimitParticipants] = useState(false);
  const [maxParticipants, setMaxParticipants] = useState(0);

  const handleSubmit = () => {
    // Her kan du håndtere innsending av skjemaet
    const eventData = {
      name,
      allowSameDay,
      waitList,
      fixedPrice,
      price,
      limitParticipants,
      maxParticipants,
    };

    console.log('Event data:', eventData);
    // Legg til logikk for å sende eventData til backend
  };

  return (
    <>
      <h1>Opprett mal</h1>
      
      {/* Navn */}
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

      {/* Tillat andre arrangement på samme dag */}
      <div>
        <label htmlFor="allowSameDay">Tillat andre arrangement på samme dag</label>
        <input
          id="allowSameDay"
          type="checkbox"
          checked={allowSameDay}
          onChange={() => setAllowSameDay(!allowSameDay)}
        />
      </div>

      {/* Tillat venteliste */}
      <div>
        <label htmlFor="waitList">Tillat venteliste</label>
        <input
          id="waitList"
          type="checkbox"
          checked={waitList}
          onChange={() => setWaitList(!waitList)}
        />
      </div>

      {/* Fast pris */}
      <div>
        <label htmlFor="fixedPrice">Fast pris</label>
        <input
          id="fixedPrice"
          type="checkbox"
          checked={fixedPrice}
          onChange={() => setFixedPrice(!fixedPrice)}
        />
        {fixedPrice && (
          <div>
            <label htmlFor="price">Pris</label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Pris"
            />
          </div>
        )}
      </div>

      {/* Begrens antall plasser */}
      <div>
        <label htmlFor="limitParticipants">Begrens antall plasser</label>
        <input
          id="limitParticipants"
          type="checkbox"
          checked={limitParticipants}
          onChange={() => setLimitParticipants(!limitParticipants)}
        />
        {limitParticipants && (
          <div>
            <label htmlFor="maxParticipants">Max plasser</label>
            <input
              id="maxParticipants"
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(Number(e.target.value))}
              placeholder="Max plasser"
            />
          </div>
        )}
      </div>

      <button onClick={handleSubmit}>Opprett arrangement</button>
    </>
  );
}
