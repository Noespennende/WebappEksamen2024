import React from 'react';

interface StepNavigationProps {
  courseCreateSteps: Array<{ name: string }>;
  currentStep: string;
  handleStepChange: (index: number) => void;
  isFormValid: boolean;
  onSubmit: () => void;
}
export default function NavigationByStep({
    courseCreateSteps,
    currentStep,
    handleStepChange,
    isFormValid,
    onSubmit,
  }: StepNavigationProps){
    return (
        <nav className="mb-8 flex w-full">
          <ul data-testid="steps" className="flex w-full">
            {courseCreateSteps?.map((courseStep, index) => (
              <button
                type="button"
                data-testid="step"
                key={courseStep.name}
                onClick={() => handleStepChange(index)}
                className={`h-12 w-1/4 border border-slate-200 ${
                  currentStep === courseStep.name
                    ? "border-transparent bg-slate-400"
                    : "bg-transparent"
                }`}
              >
                {courseStep.name}
              </button>
            ))}
            <button
              disabled={!isFormValid}
              data-testid="form_submit"
              type="button"
              onClick={onSubmit}
              className="h-12 w-1/4 border border-slate-200 bg-emerald-300 disabled:bg-transparent disabled:opacity-50"
            >
              Publiser
            </button>
          </ul>
        </nav>
      );
    };
