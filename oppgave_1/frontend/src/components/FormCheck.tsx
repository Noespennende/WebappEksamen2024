import React from 'react';

interface FormStatusProps {
  success: boolean;
  formError: boolean;
}

const FormCheck: React.FC<FormStatusProps> = ({ success, formError }) => {
  return (
    <>
      {formError && <p data-testid="form_error">Fyll ut alle felter med *</p>}
      {success && <p className="text-emerald-600" data-testid="form_success">Skjema sendt</p>}
    </>
  );
};

export default FormCheck;