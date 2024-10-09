import React from 'react';
import {Brain, Bookmarks, CheckSquare, ListNumbers} from "phosphor-react";
import Link from "next/link";

function DashboardMetric({title, link, linkLabel, metric, icon}) {

    const useIcon = (val) => {
        switch (val){
            case "Brain":
                return <Brain size={22}/>
            case "ListNumbers":
                return <ListNumbers size={22}/>
            case "Bookmarks":
                return <Bookmarks size={22}/>
            case "CheckSquare":
                return <CheckSquare size={22}/>
            default:
                return null
        }

    }

    return (
        <div className="bg-gray-50 overflow-hidden text-center flex flex-col justify-between  pb-4 rounded-lg shadow-xl">
            <div className={"flex align-middle items-center justify-center text-white bg-gray-700 p-2"}>
                {useIcon(icon)}
                <div className=" font-light ml-2">{title}</div>
            </div>
            <div className="my-4 text-4xl font-light ">{metric}</div>
                <Link href={link} className={`text-xs bg-indigo-700 hover:bg-indigo-500 mx-8 m-auto text-white py-2 px-8 text-center rounded-full`}>{linkLabel}</Link>
        </div>
    );
}

export default DashboardMetric;
