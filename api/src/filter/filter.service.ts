export async function fetchTags() {
  try {
    const response = await __db?.tag.findMany();
    const names = response?.map((item: any) => item.name);
    
    return names;
  } catch (e) {
    console.error("Failed to fetch tags:", e);
    throw new Error((e as Error).message || "Failed to fetch tags");
  }
}

export async function fetchYears() {
  try {
    const response = await __db?.year.findMany();
    const years = response?.map((item: any) => item.year);
    return years;
  } catch (e) {
    console.error("Failed to fetch years:", e);
    throw new Error((e as Error).message || "Failed to fetch years");
  }
}

export async function fetchDepartments() {
  try {
    const response = await __db?.department.findMany();
    const deptNames = response?.map((item: any) => item.departmentName);
    return deptNames;
  } catch (e) {
    console.error("Failed to fetch departments:", e);
    throw new Error((e as Error).message || "Failed to fetch departments");
  }
}

export async function fetchCourses() {
  try {
    const response = await __db?.course.findMany();
    const courseNames = response?.map((item: any) => item.courseName);
    return courseNames;
  } catch (e) {
    throw new Error((e as Error).message || "Failed to fetch courses");
  }
}
