import { faker } from '@faker-js/faker';
import {Item, ApiResponse} from '~/types/items'

const TOTAL_ITEMS = 1500
const PAGE_SIZE = 50

export default defineEventHandler((event) => {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const totalPages = Math.ceil(TOTAL_ITEMS / PAGE_SIZE)

    const items: Item[] = Array.from({ length: PAGE_SIZE }, () => ({
        id: faker.string.uuid(),
        avatar: faker.image.avatar(),
        name: faker.person.fullName(),
        website: faker.internet.url(),
        views: faker.number.int({ min: 100, max: 1_000_000 }),
    }))

    const response: ApiResponse = {
        items,
        hasNextPage: page < totalPages,
    }

    return response
})