import { UserModel } from "@/types/user_model";
import algoliasearch from "algoliasearch";
import { getUserById } from "./database";

export const searchClient = algoliasearch(
    'GCNFAI2WB6',
    'c89ebf37b46a3683405be3ed0901f217',
);

// export type BoundingBox = [number, number, number, number]; //N, W, S, E
export type BoundingBox = {
    readonly sw: { lat: number, lng: number },
    readonly ne: { lat: number, lng: number },
};

export async function queryVenuesInBoundedBox(bounds: BoundingBox | null): Promise<UserModel[]> {
    const index = searchClient.initIndex('prod_users');
    const response = await index.search('', {
        filters: 'occuperations:Venue OR occupations:venue AND deleted:false',
        insideBoundingBox: bounds === null 
            ? undefined 
            : [[bounds.sw.lat, bounds.sw.lng, bounds.ne.lat, bounds.ne.lng]],
    });

    if (response.hits.length > 0) {
        const users = await Promise.all(
            response.hits.map(async (hit: any) => {
                const userId = hit.objectID;
                const user = await getUserById(userId);
                return user;
            }),
        );

        return users.filter((user) => user !== null) as UserModel[];
    }

    return [];
}