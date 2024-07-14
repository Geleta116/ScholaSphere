import { create } from 'zustand';

interface FilterState {
  tags: string[];
  years: string[];
  departments: string[];
  courses: string[];
  selectedYear: string;
  selectedDepartment: string;
  selectedCourse: string;
  selectedTags: string[];
  setTags: (tags: string[]) => void;
  setYears: (years: string[]) => void;
  setDepartments: (departments: string[]) => void;
  setCourses: (courses: string[]) => void;
  setSelectedYear: (year: string) => void;
  setSelectedDepartment: (department: string) => void;
  setSelectedCourse: (course: string) => void;
  setSelectedTags: (tags: string[]) => void;
  fetchFilterOptions: () => Promise<void>;
}

const useFilterStore = create<FilterState>((set) => ({
  tags: [],
  years: [],
  departments: [],
  courses: [],
  selectedYear: '',
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
        fetch('/api/tags').then((res) => res.json()),
        fetch('/api/years').then((res) => res.json()),
        fetch('/api/departments').then((res) => res.json()),
        fetch('/api/courses').then((res) => res.json()),
      ]);
      set({ tags: tagsRes, years: yearsRes, departments: departmentsRes, courses: coursesRes });
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    }
  },
}));

export default useFilterStore;
