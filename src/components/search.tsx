'use client';

import { UserModel } from "@/types/user_model";
import algoliasearch from "algoliasearch/lite";
import {
    InstantSearch,
    Hits,
} from "react-instantsearch";
import Image from 'next/image';
import Link from 'next/link';
import CustomSearchBox from "./searchbox";
import { useEffect } from "react";

const searchClient = algoliasearch(
    'GCNFAI2WB6',
    'c89ebf37b46a3683405be3ed0901f217',
);

function Hit({ hit }: { hit: UserModel }) {
    useEffect(() => {
        // get the artist info using hit.id

    }, [hit]);

    const profileImage = (() => {
        if (
            hit.profilePicture === undefined ||
            hit.profilePicture === null ||
            hit.profilePicture === '') {
            return '/images/default_avatar.png';
        }

        return hit.profilePicture;
    })();

    return (
        <Link
            href={`https://tapped.ai/${hit.username}`}
        >
            <div
                className='w-full flex flex-row items-center justify-start bg-gray-700 rounded-xl px-4 py-3 my-4 hover:scale-105 transition-all duration-150 ease-in-out'
            >
                <Image
                    src={profileImage}
                    alt="musician profile picture"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div className="w-4" />
                <div>
                    <h1 className="font-bold text-xl">{hit.artistName}</h1>
                    <p className="text-sm text-gray-400">@{hit.username}</p>
                </div>
            </div>
        </Link>
    );
}

export default function Search() {
    return (
        <>
            <InstantSearch 
                future={{ preserveSharedStateOnUnmount: true }}
                indexName="prod_users" 
                searchClient={searchClient}>
                <CustomSearchBox />
                <div className="w-full md:w-1/2">
                    <Hits hitComponent={Hit} />
                </div>
            </InstantSearch>
        </>
    );
}