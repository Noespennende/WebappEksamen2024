import { useState, ChangeEvent } from 'react';
import { validateCreateTemplate } from '../types';
import { Weekday } from '@/types/Types';

type FieldState = {
  value: any
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  error?: string,
};

type TemplateFields = {
  name: string;
  isPrivate: boolean;
  allowSameDayEvent: boolean;
  waitList: boolean;
  fixedPrice: boolean;
  price: number;
  limitedParticipants: boolean;
  maxParticipants: number;
  fixedWeekdays: Weekday[];
};

const validateField = (key: keyof TemplateFields, value: any): { isValid: boolean, error: string | undefined } => {
    switch (key) {
      case 'name':
        // Name skal være en ikke-tom string
        if (typeof value === 'string' && value.trim().length > 3) {
            return { isValid: true, error: undefined };
          } else {
            return { isValid: false, error: 'Navn må være mer enn 3 tegn' };
          }
      case 'price':
        // Price skal være et tall eller undefined
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
      case 'isPrivate':
      case 'fixedPrice':
      case 'allowSameDayEvent':
      case 'waitList':
      case 'limitedParticipants':
        // boolean-verdier
        if (typeof value === 'boolean') {
          return { isValid: true, error: undefined };
        } else {
          return { isValid: false, error: 'This field must be a boolean.' };
        }
      default:
        return { isValid: false, error: 'Invalid field.' };
    }
  };


/* Validerer form-data */

export function useTemplateForm(initialValues: TemplateFields) {
  const [fields, setFields] = useState<Record<keyof TemplateFields, FieldState>>(
    Object.fromEntries(
      Object.keys(initialValues).map((key) => [
        key,
        { 
          value: initialValues[key as keyof TemplateFields] ?? undefined,
          isValid: key === 'name' ? false : true,
          isDirty: false,
          isTouched: false,
          error: undefined,
        },
      ])
    ) as Record<keyof TemplateFields, FieldState>
  );

  // Tar inputtet fra skjema, oppdaterer fields, og passer på det matcher TemplateFields
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>, 
    key: keyof TemplateFields
  ) => {
    const { value, type, checked } = e.target;
    
    let newValue: string | boolean | number | undefined;
    
    if (type === 'checkbox') {
        newValue = checked;
      } else if (key === 'price' || key === 'maxParticipants') {
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

      const validation = validateField(key, newValue);

      // Oppdater feilmeldingene basert på valideringen
      newFields[key].error = validation.error || undefined;
      newFields[key].isValid = validation.isValid;

      return newFields;
    });
  };

  const handleWeekdayChange = (day: Weekday) => {
    setFields((prevFields) => {
      const newFields = { ...prevFields };
  
      // Oppdater 'fixedWeekdays' - legge til eller fjerne
      const updatedWeekdays = prevFields.fixedWeekdays.value.includes(day)
        ? prevFields.fixedWeekdays.value.filter((weekday: Weekday) => weekday !== day) // Fjern
        : [...prevFields.fixedWeekdays.value, day]; // Legg til
  
      // Oppdaterer
      newFields.fixedWeekdays = {
        ...newFields.fixedWeekdays,
        value: updatedWeekdays,
        isDirty: true,
        isTouched: true,
      };
  
      // fixedWeekdays er "valid" uansett hva som velges. den kan være tom, og den kan være full
      newFields.fixedWeekdays.isValid = true;
      newFields.fixedWeekdays.error = undefined;
  
      return newFields;
    });
  };
  

  // Skal renames til noe mer riktig
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasErrors = Object.values(fields).some(field => !field.isValid);
    if (hasErrors) {
        console.log("Validation errors found. Submission aborted.");
        console.log(fields)
        return; // Forhindrer innsending dersom det er feil
    }

    const templateData: Record<string, any> = {};
  
    
    Object.entries(fields).forEach(([key, { value }]) => {
        if (key === 'price' || key === 'maxParticipants') {
        const numberValue = Number(value);
        }
    
        
        if (key === 'price' && fields.fixedPrice.value === false) {
            return; // Hopper over 'price' hvis 'fixedPrice' er false
        }

        if (key === 'maxParticipants' && fields.limitedParticipants.value === false) {
            return; // Hopper over
        }
    
        templateData[key] = value; // Alternativ: returner error

      });


    // Validerer hele fields - passer på at det er av, og følger typen CreateTemplate
    const validated = validateCreateTemplate(templateData);
  
    if (!validated.success) {
        // Logg ut detaljer om feilen
        // TODO: Må gjøre noe bedre her
        console.error("Validation failed:", validated.error.format());
      } else {
        console.log("Validation passed:", validated.data);
      }
    console.log("Template data:", templateData);
  
    return validated
  };
  

  return {
    fields,
    handleInputChange,
    handleWeekdayChange,
    handleSubmit,
  };
}
