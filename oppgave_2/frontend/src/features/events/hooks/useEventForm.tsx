import { WeekdayEnum } from '@/helpers/schema';
import { Weekday } from '@/types/Types';
import { useState, ChangeEvent } from 'react';
import { Occasion } from '../types';

type FieldState = {
  value: any;
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  error: string | undefined;
  disabled?: boolean;
};

type EventFields = {
  name: string;
  template: string;
  isPrivate: boolean;
  allowSameDayEvent: boolean;
  waitList: boolean;
  fixedPrice: boolean;
  price: number;
  limitedParticipants: boolean;
  maxParticipants: number;
  fixedWeekdays: string[],
  date: string;
  category: string;
  slug: string;
  description: string;
};

const validateField = (
  key: keyof EventFields,
  value: string | boolean | number | Date | undefined,
  fields: Record<keyof EventFields, FieldState>, // Legg til `fields` som argument
  events: Pick<Occasion, 'template' | 'date' | 'name'>[]
) => {
  switch (key) {
    case 'name':
      if (typeof value === 'string' && value.trim().length > 3) {
        return { isValid: true, error: undefined };
      } else {
        return { isValid: false, error: 'Navn må være mer enn 3 tegn' };
      }
    case 'price':
      if (typeof value === 'number' && !isNaN(value)) {
        if (value >= 0) {
          return { isValid: true, error: undefined };
        } else {
          return { isValid: false, error: 'Pris må være null eller et positivt tall.' };
        }
      } else {
        return { isValid: false, error: 'Pris må være et gyldig tall' };
      }
    case 'maxParticipants':
      if (typeof value === 'number' && !isNaN(value)) {
        if (value > 0) {
          return { isValid: true, error: undefined };
        } else {
          return { isValid: false, error: 'Maks deltakere må være mer enn null.' };
        }
      } else {
        return { isValid: false, error: 'Maks deltakere må være et gyldig tall' };
      }
    case 'slug':
      if (typeof value === 'string' && value.trim().length > 0) {
        return { isValid: true, error: undefined };
      } else {
        return { isValid: false, error: 'Slug må være en ikke-tom streng' };
      }
    case 'date':
      let dateValue: Date | null = null;
      if (typeof value === 'string' && value.trim()) {
        dateValue = new Date(value);
      } else if (value instanceof Date && !isNaN(value.getTime())) {
        dateValue = value;
      }

      // Sjekk om datoen er gyldig
      if (dateValue && !isNaN(dateValue.getTime())) {
        // Sjekker om det finnes et event med samme mal og dato
        console.log("Existing events:", events);

        const conflictingEvent = events.find(
          (event) => {
            console.log(
              `Checking event: ${event.template} with date: ${event.date.getFullYear()}-${event.date.getMonth() + 1}-${event.date.getDate()}`, 
              `Against: ${fields.template.value} with date: ${dateValue.getFullYear()}-${dateValue.getMonth() + 1}-${dateValue.getDate()}`
            );
            return event.template === fields.template.value && 
           event.date.getFullYear() === dateValue.getFullYear() && 
           event.date.getMonth() === dateValue.getMonth() && 
           event.date.getDate() === dateValue.getDate();
          }
        );

        if (conflictingEvent) {
          return { 
            isValid: false, 
            error: 'Det finnes allerede et event med denne datoen og malen.' 
          };
        }

        // Sjekker så om ukedagen og om den faller utenfor fixedWeekdays
        const days: Weekday[] = WeekdayEnum.options; //["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const selectedDay = days[dateValue.getDay()];
      
        console.log("selected: ", selectedDay);
      
        // Sjekker om selectedDay er i fixedDays
        if (fields.fixedWeekdays && fields.fixedWeekdays.value.length > 0) {
          if (!fields.fixedWeekdays.value.includes(selectedDay)) {
            return { isValid: false, error: `Datoen kan ikke falle på en ${selectedDay}` };
          }
        }
        // Alt er godkjent 
        return { isValid: true, error: undefined }
    
      } else {
        return { isValid: false, error: 'Dato er ugyldig' };
      };
        
    case 'category':
      if (typeof value === 'string' && value.trim().length > 0) {
        return { isValid: true, error: undefined };
      } else {
        return { isValid: false, error: 'Velg en gyldig kategori' };
      }
    case 'description':
      if (typeof value === 'string' && value.trim().length > 10) {
        return { isValid: true, error: undefined };
      } else if (typeof value === 'string' && value.trim().length > 0) {
        return { isValid: false, error: 'Beskrivelsen må være minst 10 tegn lang' };
      } else {
        return { isValid: false, error: 'Beskrivelse må være spesifisert' };
      }
    case 'template':
    case 'isPrivate':
    case 'fixedPrice':
    case 'allowSameDayEvent':
    case 'waitList':
    case 'limitedParticipants':
      if (typeof value === 'boolean') {
        return { isValid: true, error: undefined };
      } else {
        return { isValid: false, error: 'Dette feltet må være en boolean' };
      }
    default:
      return { isValid: false, error: 'Ugyldig felt' };
  }
};

export function useEventForm(initialValues: EventFields, events: Pick<Occasion, 'template' | 'date' | 'name'>[]) {
  const [fields, setFields] = useState<Record<keyof EventFields, FieldState>>(
    Object.fromEntries(
      Object.keys(initialValues).map((key) => [
        key,
        {
          value: initialValues[key as keyof EventFields] ?? undefined,
          isValid: true, // Setter som true som standard
          isDirty: false,
          isTouched: false,
          error: undefined,
          disabled: false, // Standardverdi for disabled
        },
      ])
    ) as Record<keyof EventFields, FieldState>
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    key: keyof EventFields
  ) => {
    if (fields[key]?.disabled) return; // Håndter at endringer ikke skjer hvis feltet er disabled
  
    const { value, type } = e.target;
  
    let newValue: string | boolean | number | undefined;
  
    // Håndter spesifikke felt-typer
    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number' || key === 'price' || key === 'maxParticipants') {
      newValue = value ? parseFloat(value) : undefined;
    } else if (type === 'date') {
      newValue = value ? new Date(value).toISOString().split('T')[0] : undefined; // ISO-format
    } else {
      newValue = value;
    }
  
    // Oppdater state for feltet
    setFields((prevFields) => {
      const newFields = { ...prevFields };
  
      newFields[key] = {
        ...newFields[key],
        value: newValue,
        isDirty: true,
        isTouched: true,
      };
  
      // Valider feltet
      const validation = validateField(key, newValue, newFields, events);
      newFields[key].error = validation.error || undefined;
      newFields[key].isValid = validation.isValid;
  
      return newFields;
    });
  };
  

  const setFieldValue = (key: keyof EventFields, value: any, disabled: boolean = false) => {
    setFields((prevFields) => {
      const newFields = { ...prevFields };
      newFields[key] = {
        ...newFields[key],
        value: value,
        isDirty: true,
        isTouched: true,
        disabled: disabled, // Setter disabled til ønsket verdi
      };

      const validation = validateField(key, value, newFields, events);
      newFields[key].error = validation.error || undefined;
      newFields[key].isValid = validation.isValid;

      return newFields;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hasErrors = Object.values(fields).some(field => !field.isValid);
    if (hasErrors) {
      console.log('Validation errors found. Submission aborted.');
      return;
    }

    const templateData: Record<string, any> = {};

    Object.entries(fields).forEach(([key, { value, disabled }]) => {
      if (disabled) return; // Hopp over disabled felt når du bygger templateData

      if (key === 'price' || key === 'maxParticipants') {
        const numberValue = value ? Number(value) : undefined;
        templateData[key] = numberValue;
      } else {
        templateData[key] = value;
      }

      if (key === 'price' && !fields.fixedPrice.value) {
        delete templateData[key]; // Hvis 'fixedPrice' er false, hopp over prisfelt
      }

      if (key === 'maxParticipants' && !fields.limitedParticipants.value) {
        delete templateData[key]; // Hvis 'limitedParticipants' er false, hopp over maxParticipants
      }
    });

    console.log(templateData);
    return templateData;
  };

  return {
    fields,
    handleInputChange,
    setFieldValue,
    handleSubmit,
  };
}
