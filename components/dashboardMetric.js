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
        <div className="bg-white dark:bg-black overflow-hidden text-center shadow flex flex-col justify-between dark:rounded-[7px] dark:text-white">
            <div className={"flex align-middle items-center justify-center text-white bg-gray-700 p-2"}>
                {useIcon(icon)}
                <div className=" font-light ml-2">{title}</div>
            </div>
            <div className="my-4 text-4xl font-light ">{metric}</div>
            <div className={"flex align-middle items-center justify-center text-white bg-blue-500 dark:bg-blue-900 p-2 hover:bg-blue-600"}>
                <Link href={link}>
                    <span className={"text-white text-xs"}>{linkLabel}</span>
                </Link>
            </div>
        </div>
    );
}

export default DashboardMetric;
