export type LoginResponse = {
    userId: string,
    username: string,
    notes: Note[]
}

export type SessionReponse = LoginResponse;

export interface User {
    id: string;
    username: string;
}


export type Note = {
    id: string,
    note: string,
    title: string,
    updatedAt: Date
}