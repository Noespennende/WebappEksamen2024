
export const getOneParam = "template-id"
export const deleteParam = getOneParam
export const patchParam = getOneParam

export const templatesGet = `/`
export const templateGetOne = `/:${getOneParam}`
export const templateCreate = `/create`
export const templatePatch = `/update/:${getOneParam}`
export const templateDelete = `/delete/:${getOneParam}`