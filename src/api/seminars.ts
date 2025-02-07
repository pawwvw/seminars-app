export interface Seminar {
    id: number,
    title: string,
    description: string,
    date: string,
    time: string,
    photo: string
}

export const fetchSeminars = async(): Promise<Seminar[]> =>{
    const response = await fetch("http://localhost:5000/seminars")
    return response.json();
}