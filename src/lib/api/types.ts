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

export interface Comment {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: null;
    author: Partial<Owner>;
    reactions: Reactions[] | null;
}

export interface Reactions {
    reaction_type: string;
    createdAt: string;
}
