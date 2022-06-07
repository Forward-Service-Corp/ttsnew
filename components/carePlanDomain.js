import React from 'react';
import {labelMap} from "../lib/serviceLabelsMap";

function CarePlanDomain({item}) {
    return (
        <div className={"w-full md:w-1/2 text-sm p-5 inline bg-gray-100 bg-opacity-50 "}>
            {item.name !== null ? (<div className={"mb-3"}><p className={"text-xs uppercase text-gray-500"}>Name: </p>
                <p>{item.name}</p></div>) : null}

            {item.domain !== null ? (<div className={"mb-3"}><p className={"text-xs uppercase text-gray-500"}>Domain: </p>
                <p>{labelMap[item.domain]}</p></div>) : null}

            {item.phone !== null ? (<div className={"mb-3"}><p className={"text-xs uppercase text-gray-500"}>Phone: </p>
                <p>{item.phone}</p></div>) : null}

            {item.email !== null ? (<div className={"mb-3"}><p className={"text-xs uppercase text-gray-500"}>Email: </p>
                <p>{item.email}</p></div>) : null}

            {item.contact !== null ? (<div className={"mb-3"}><p className={"text-xs uppercase text-gray-500"}>Contact person: </p>
                <p>{item.contact}</p></div>) : null}

            {item.url !== null ? (<div className={"mb-3"}><p className={"text-xs uppercase text-gray-500"}>Website: </p>
                <p>{item.url}</p></div>) : null}

            {item.requirements !== null ? (<div className={"mb-3"}><p className={"text-xs uppercase text-gray-500"}>Requirements: </p>
                <p>{item.requirements}</p></div>) : null}

            {item.needs !== null ? (<div className={"mb-3"}><p className={"text-xs uppercase text-gray-500"}>Need to bring: </p>
                <p>{item.needs}</p></div>) : null}
        </div>
    );
}

export default CarePlanDomain;
