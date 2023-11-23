import { labelMap} from "../lib/serviceLabelsMap";
import {ArrowCircleRight} from "phosphor-react";

export default function ServicesTable({services}) {

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-3 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300 dark:divide-opacity-20 table-auto">
                                <thead className="bg-gray-50 dark:bg-black dark:text-white">
                                <tr>
                                    <th scope="col"
                                        className="py-1 pl-1 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-white dark:font-extralight">
                                        Name
                                    </th>
                                    <th scope="col"
                                        className="px-1 py-1 text-left text-sm font-semibold text-gray-900 hidden md:table-cell dark:text-white dark:font-extralight">
                                        Domain
                                    </th>
                                    <th scope="col"
                                        className="px-1 py-1 text-left text-sm font-semibold text-gray-900 hidden md:table-cell dark:text-white dark:font-extralight">
                                        Phone
                                    </th>
                                    <th scope="col"
                                        className="px-1 py-1 text-left text-sm font-semibold text-gray-900 hidden md:table-cell dark:text-white dark:font-extralight">
                                        County
                                    </th>
                                    <th scope="col"
                                        className="px-1 py-1 text-left text-sm font-semibold text-gray-900 hidden md:table-cell dark:text-white dark:font-extralight">
                                    </th>

                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:bg-black dark:bg-opacity-10 dark:divide-opacity-[3%]">
                                {services.map((service) => (
                                    <tr key={service._id} className={`dark:hover:bg-indigo-800 dark:hover:bg-opacity-10`}>
                                        <td className="py-1 px-1 text-sm font-medium text-gray-900 sm:pl-6 truncate sm:max-w-full">
                                            <a href={`/referral/${service._id}`} target={`_blank`} rel={`noreferrer`} className="text-orange-600 hover:text-orange-900 underline dark:text-white">
                                                {service.name}
                                            </a>
                                        </td>
                                        <td className={`px-1 py-1 text-sm text-gray-500 hidden md:table-cell dark:text-gray-300 dark:font-extralight`}>
                                            {labelMap[service.service]}
                                        </td>
                                        <td className={`px-1 py-1 text-sm text-gray-500 hidden md:table-cell dark:text-gray-300`}>
                                            {service.phone ? service.phone : service.contactPhone || ""}
                                        </td>
                                        <td className=" px-1 text-xs text-gray-500 hidden md:table-cell dark:text-gray-300">{service.county}</td>
                                        <td className="py-1 px-1 text-sm font-medium text-gray-900 sm:pl-6 truncate max-w-[50px] sm:max-w-full">
                                            <a href={`/referral/${service._id}`} target={`_blank`} rel={`noreferrer`} className="text-orange-600 hover:text-orange-900 underline dark:text-blue-600 dark:hover:text-blue-400">
                                                <ArrowCircleRight size={26}/>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
