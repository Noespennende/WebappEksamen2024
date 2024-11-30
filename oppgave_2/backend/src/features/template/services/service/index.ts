export const createTemplateService = (/*templateRepository: TemplateRepository*/) => {
    return { 
    };
  };

  export const templateService = createTemplateService(/*templateRepository*/)
  export type TemplateService = ReturnType<typeof createTemplateService>;
/*
#### @/features/admin/services/service/index.ts
- Laget mellom controller og repository
- Bruker services/repository
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/service/index.ts

*/