export default interface BlogPost {
    _id: string;
    title: string;
    content: string;
    mainImage: string;
    extraSmallImages: string[];
    tags: string[];
    category: string;
    author: {
        id: string;
        name: string;
    };
}