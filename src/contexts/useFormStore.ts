import { Category } from "@prisma/client";
import { create } from "zustand";

export interface BasicInfoProps {
  name: string;
  description: string;
  price: string;
  category: Category;
}

export interface LocationProps {
  location?: string;
  area?: string;
  carSpaces?: string;
  bedrooms?: string;
  bathrooms?: string;
  characteristics?: string[] | null;
}

export interface SelectedImagesProps {
  files: File[];
  previewUrls: string[];
}

interface FormState {
  step: number;
  setStep: (step: number) => void;
  resetForm: () => void;

  basicInfo: BasicInfoProps | null;
  setBasicInfo: (data: BasicInfoProps) => void;

  location: LocationProps | null;
  setLocation: (data: LocationProps) => void;

  selectedImages: SelectedImagesProps | null;
  setSelectedImages: (data: SelectedImagesProps) => void;
}

const useFormStore = create<FormState>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  resetForm: () => set({ step: 1 }),

  basicInfo: null,
  setBasicInfo: (basicInfo) => set({ basicInfo }),

  location: null,
  setLocation: (location) => set({ location }),

  selectedImages: null,
  setSelectedImages: (data: SelectedImagesProps) => {
    set((state) => ({
      selectedImages: {
        previewUrls: data.previewUrls,
        files: data.files,
      },
    }));
  },
}));

export default useFormStore;
