import { useState, ChangeEvent } from 'react';

type FieldState = {
  value: any;
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  error: string | undefined;
  disabled?: boolean; // Legger til disabled-status for hvert felt
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
  date: string;
  category: string;
  slug: string;
};

const validateField = (key: keyof EventFields, value: any): { isValid: boolean, error: string | undefined } => {
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
      if (typeof value === 'string' && value.trim().length > 0) {
        return { isValid: true, error: undefined };
      } else {
        return { isValid: false, error: 'Dato må være spesifisert' };
      }
    case 'category':
      if (typeof value === 'string' && value.trim().length > 0) {
        return { isValid: true, error: undefined };
      } else {
        return { isValid: false, error: 'Kategori må være spesifisert' };
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

export function useEventForm(initialValues: EventFields) {
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
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: keyof EventFields
  ) => {
    if (fields[key]?.disabled) return; // Håndter at endringer ikke skjer hvis feltet er disabled

    const { value, type } = e.target as HTMLInputElement;

    let newValue: string | boolean | number | undefined;

    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
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

      const validation = validateField(key, value);
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
