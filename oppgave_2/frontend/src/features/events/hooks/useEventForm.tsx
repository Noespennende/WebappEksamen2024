import { WeekdayEnum } from '@/helpers/schema';
import { Weekday } from '@/types/Types';
import { useState, ChangeEvent } from 'react';
import { Occasion } from '../types';
import { validateCreateEvent } from '../helpers/schema';
import { UUID } from 'crypto';

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
  address: string;
  template: UUID | undefined;
  isPrivate: boolean;
  allowSameDayEvent: boolean;
  waitinglist: boolean;
  fixedPrice: boolean;
  price: number;
  limitedParticipants: boolean;
  maxParticipants: number;
  fixedWeekdays: Weekday[],
  date: string;
  category: string;
  slug: string;
  body: string[];
};


const validateAllFields = (
  fields: Record<keyof EventFields, FieldState>, 
  events?: Pick<Occasion, 'template' | 'date' | 'name'>[]) => {
  let newFields = { ...fields };

  Object.keys(fields).forEach((key) => {
    const fieldKey = key as keyof EventFields;
    const value = fields[fieldKey].value;
    const validation = validateField(fieldKey, value, newFields, events);

    // Oppdater validitet og feilmelding for hvert felt
    newFields[fieldKey].isValid = validation.isValid;
    newFields[fieldKey].error = validation.error || undefined;
  });

  return newFields;  // Returnerer de validerte feltene
};

const validateField = (
  key: keyof EventFields,
  value: string | boolean | number | Date | undefined,
  fields: Record<keyof EventFields, FieldState>,
  events?: Pick<Occasion, 'template' | 'date' | 'name'>[]
) => {
  switch (key) {
    case 'name':
      if (typeof value === 'string' && value.trim().length > 3) {
        return { isValid: true, error: undefined };
      } else {
        return { isValid: false, error: 'Navn må være mer enn 3 tegn' };
      }

    case 'address':
      if (typeof value === 'string' && value.trim().length > 3) {
        return { isValid: true, error: undefined };
      } else {
        return { isValid: false, error: 'Addressen må være mer enn 3 tegn' };
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

        const conflictingEvent = events?.find(
          (event) => {
            /*console.log(
              `Checking event: ${event.template} with date: ${event.date.getFullYear()}-${event.date.getMonth() + 1}-${event.date.getDate()}`, 
              `Against: ${fields.template.value} with date: ${dateValue.getFullYear()}-${dateValue.getMonth() + 1}-${dateValue.getDate()}`
            );*/
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
      case 'body':
        if (Array.isArray(value)) {
          if (value.length === 0 || value.every(paragraph => paragraph.trim().length === 0)) {
            return { isValid: false, error: 'Beskrivelse kan ikke være tom' };
          }
      
          const invalidParagraphs = value
            .map((paragraph, index) => {
              if (paragraph.trim().length < 5) {
                return `Paragraf ${index + 1} må være minst 5 tegn lang`;
              }
              return null;
            })
            .filter((error) => error !== null);
          
          if (invalidParagraphs.length > 0) {
            return { isValid: false, error: invalidParagraphs.join(", ") };
          }
          
          return { isValid: true, error: undefined };
        }
        return { isValid: false, error: 'Beskrivelse må være spesifisert' };
    case 'template':
    case 'fixedWeekdays':
      return { isValid: true, error: undefined };
    case 'isPrivate':
    case 'fixedPrice':
    case 'allowSameDayEvent':
    case 'waitinglist':
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


export function useEventForm(initialValues: EventFields, events?: Pick<Occasion, 'template' | 'date' | 'name'>[]) {
  const [fields, setFields] = useState<Record<keyof EventFields, FieldState>>(
    Object.fromEntries(
      Object.keys(initialValues).map((key) => [
        key,
        {
          value: initialValues[key as keyof EventFields] ?? undefined,
          isValid: false, // Setter som true som standard
          isDirty: false,
          isTouched: false,
          error: undefined,
          disabled: false, // Standardverdi for disabled
        },
      ])
    ) as Record<keyof EventFields, FieldState>
  );


  const resetFields = (initialValues: EventFields) => {
    setFields((prevFields) => {
      const resetFields = Object.fromEntries(
        Object.keys(prevFields).map((key) => [
          key,
          {
            value: initialValues[key as keyof EventFields] ?? undefined,
            isValid: false,
            isDirty: false,
            isTouched: false,
            error: undefined,
            disabled: false,
          },
        ])
      );
      return resetFields as Record<keyof EventFields, FieldState>;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    key: keyof EventFields
  ) => {
    if (fields[key]?.disabled) return;
    
    const { value, type } = e.target;
    
    let newValue: string | boolean | number | undefined;
    
    // Handle specific field types
    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number' || key === 'price' || key === 'maxParticipants') {
      newValue = value ? parseFloat(value) : undefined;
    } else {
      newValue = value;
    }
  
      setFields((prevFields) => {
        const newFields = { ...prevFields };
  
        newFields[key] = {
          ...newFields[key],
          value: newValue,
          isDirty: true,
          isTouched: true,
        };
  
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

    const validatedFields = validateAllFields(fields, events);

    setFields(validatedFields);
  
    const hasErrors = Object.entries(fields).filter(([key, field]) => !field.isValid);

    if (hasErrors.length > 0) {
      console.log('Validation errors found. Submission aborted.');
      // Logg detaljene for hvert felt med feil
      hasErrors.forEach(([key, field]) => {
        console.log(`Field "${key}" has error: ${field.error}`);
      });
      return;
    }

    const eventData: Record<string, any> = {};
  
    Object.entries(fields).forEach(([key, { value, disabled }]) => {
      //if (disabled) return;

      if (key === 'price' || key === 'maxParticipants') {
          const numberValue = Number(value);
          eventData[key] = numberValue;
      } else if (key === 'date') {
          const dateValue = value ? new Date(value) : undefined;
          eventData[key] = dateValue;
      }  else if (key === 'waitinglist') {
          const booleanValue = value === true || value === 'true';
        eventData[key] = booleanValue;
      } else {
          eventData[key] = value;
      }
  });
  
    const validated = validateCreateEvent(eventData);

    console.log("Try data: ", eventData)
  
    if (!validated.success) {
      console.error("Validation failed:", validated.error.format());
    } else {
      console.log("Validation passed:", validated.data);
    }
  
    return validated;
  };

  return {
    fields,
    handleInputChange,
    setFieldValue,
    handleSubmit,
    resetFields,
  };
}
