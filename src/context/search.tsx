import { BoundingBox, queryVenuesInBoundedBox } from "@/utils/search";
import { useQuery } from "@tanstack/react-query";

export const useSearch = () => {
    const useVenueData = (boundingBox: BoundingBox | null) =>
        useQuery({
            queryKey: ["venues", boundingBox],
            queryFn: async () => {
                const users = await queryVenuesInBoundedBox(boundingBox)
                return users;
            },
        });

    return {
        useVenueData,
    };
};