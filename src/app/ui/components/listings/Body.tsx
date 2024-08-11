import React, { Suspense } from 'react'
import Filters from './FIlters'
import { FilteredListingsSkeleton, MapContainer, MapSkeleton } from '../common'
import { ListingSection } from './ListingsSection'
import { type IPopularCategoriesData, type ILocationsList } from '~/app/(application)/definitions'

function Body({query, locationsList, searchParams, categories} : {query: URLSearchParams, locationsList: ILocationsList[], searchParams:  Record<string, string>, categories: IPopularCategoriesData[]}) {
  return (    
    <main className="static w-full lg:pl-[70px]">
        <div className="lg:flex w-full relative">
            <div className={`flex w-full flex-col pb-6 lg:w-7/12 pl-10 lg:pl-0`}>
                <Filters locationsList={locationsList} categories={categories}/>
                <div className={`${searchParams.isMapMode == 'true' && "hidden" } lg:block`}>
                <Suspense
                    fallback={<FilteredListingsSkeleton />}
                    key={query.toString()}
                >
                    <ListingSection query={query} />
                </Suspense>
                </div>
            </div>
            <div className={`${(searchParams.isMapMode == 'false' || !searchParams.isMapMode) && "hidden"} lg:block relative lg:sticky right-0 top-0 h-[80vh] lg:h-full w-full lg:w-5/12`}>
            <Suspense fallback={<MapSkeleton />} key={query.toString()}>
                <MapContainer query={query} listing={[]} />
            </Suspense>
            </div>
        </div>
    </main>
  )
}

export default Body