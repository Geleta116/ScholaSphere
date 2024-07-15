import { fetchCourses, fetchDepartments, fetchTags, fetchYears } from '@/util/api/filters-api';
import { create } from 'zustand';

interface FilterState {
  tags: string[];
  years: number[];
  departments: string[];
  courses: string[];
  selectedYear: number;
  selectedDepartment: string;
  selectedCourse: string;
  selectedTags: string[];
  setTags: (tags: string[]) => void;
  setYears: (years: number[]) => void;
  setDepartments: (departments: string[]) => void;
  setCourses: (courses: string[]) => void;
  setSelectedYear: (year: number) => void;
  setSelectedDepartment: (department: string) => void;
  setSelectedCourse: (course: string) => void;
  setSelectedTags: (tags: string[]) => void;
  fetchFilterOptions: () => Promise<void>;
}

export const useFilterStore = create<FilterState>((set) => ({
  tags: [],
  years: [],
  departments: [],
  courses: [],
  selectedYear: NaN,
  selectedDepartment: '',
  selectedCourse: '',
  selectedTags: [],
  setTags: (tags) => set({ tags }),
  setYears: (years) => set({ years }),
  setDepartments: (departments) => set({ departments }),
  setCourses: (courses) => set({ courses }),
  setSelectedYear: (year) => set({ selectedYear: year }),
  setSelectedDepartment: (department) => set({ selectedDepartment: department }),
  setSelectedCourse: (course) => set({ selectedCourse: course }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  fetchFilterOptions: async () => {
    try {
      const [tagsRes, yearsRes, departmentsRes, coursesRes] = await Promise.all([
        await fetchTags(),
        await fetchYears(),
        await fetchDepartments(),
        await fetchCourses(),
      ]);

      
      set({ tags: tagsRes, years: yearsRes, departments: departmentsRes, courses: coursesRes });
      console.log(tagsRes)
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    }
  },
}));

export default useFilterStore;
