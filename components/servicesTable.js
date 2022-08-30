import {colorMap, labelMap} from "../lib/serviceLabelsMap";

export default function ServicesTable({services}) {

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-3 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="py-1 pl-1 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col"
                                        className="px-1 py-1 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">
                                        Domain
                                    </th>
                                    <th scope="col"
                                        className="px-1 py-1 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">
                                        County
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {services.map((service, i) => (
                                    <tr key={i}>
                                        <td className="max-w-[200px] py-1 px-1 text-sm font-medium text-gray-900 sm:pl-6 truncate">
                                            {service.name}
                                        </td>
                                        <td className={`px-1 py-1 text-sm text-gray-500 hidden md:table-cell`}>
                                            <span className={`py-1 px-3 text-xs rounded-full w-auto`}>
                                                {labelMap[service.service]}
                                            </span>
                                        </td>
                                        <td className=" px-1 text-xs text-gray-500 hidden md:table-cell">{service.county}</td>
                                        <td className="relative py-3 md:py-1 px-1 text-right text-sm font-medium sm:pr-6">
                                            <a target={"_blank"} rel={"noreferrer"} href={"/referral/" + service._id}
                                               className="text-orange-600 hover:text-orange-900">
                                                View<span className="sr-only">, {service.name}</span>
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
