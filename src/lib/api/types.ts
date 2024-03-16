export interface Post {
    id: string;
    title: string;
    body: string;
    imageCover: string;
    visited: number;
    owner: Owner;
}

export interface Owner {
    id: string;
    email: string;
    image: string;
    name: string;
}
