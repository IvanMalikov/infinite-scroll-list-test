export interface Item {
    id: string,
    avatar: string,
    name: string,
    website: string,
    views: number
}

export interface ApiResponse {
    items: Item[],
    hasNextPage: boolean
}