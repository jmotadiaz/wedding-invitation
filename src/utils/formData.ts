export interface FormDataWrapper {
  get(key: string): string;
  getFile(key: string): File | null;
  has(key: string): boolean;
}

export const createFormDataWrapper = (formData: FormData): FormDataWrapper => ({
  get: (key) => (formData.get(key) as string) || "",
  getFile: (key) => (formData.get(key) as File) || null,
  has: (key) => formData.has(key),
});
