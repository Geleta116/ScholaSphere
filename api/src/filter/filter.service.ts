export async function fetchTags(){
    const response = await __db?.tag.findMany();
    return response;
}

export async function fetchYears(){
    const response = await __db?.year.findMany();
    return response;
}

export async function fetchDepartments(){
    const response = await __db?.department.findMany();
    return response;
}

export async function fetchCourses(){
    const response = await __db?.course.findMany();
    return response;
}