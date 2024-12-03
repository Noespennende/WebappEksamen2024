import { useCallback, useEffect, useState } from "react";
import { CreateTemplate, Template } from "../types";
import { LoadingStatus } from "@/types/Types";

export function useTemplate() {
    const [status, setStatus] = useState<LoadingStatus>("idle");
    const [data, setData] = useState<CreateTemplate | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    // Funksjon for å tilbakestille status til 'idle' etter en timeout
    const resetToIdle = useCallback(
      (timeout = 2000) =>
        setTimeout(() => {
          setStatus("idle");
        }, timeout),
      []
    );
  
    useEffect(() => {
      console.log("Status updated:", status);
    }, [status]);
  
    // 'add' funksjonen for ekte API-kall (her bruker vi CreateTemplate-typen)
    const add = async (data: CreateTemplate) => {
      const tryTemplate = data;
  
      try {
        setStatus("loading");
  
        /* Når ekte API-kall er på plass - denne forsvinner... */
        await new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            const templateToCreate = tryTemplate;
  
            setData(templateToCreate);
  
            resolve();
          }, 1500); 
        });

        /* Og noe slik dukker opp:
        * await templateApi.create({ tryTemplate });
        */
  
        setStatus("success");
      } catch (error) {
        setStatus("error");
        setError("Failed to create project");
        console.error("Error creating template:", error);
      } finally {
        resetToIdle();
      }
    };
  
    return {
      status,
      data,
      error,
      add,
    };
  }