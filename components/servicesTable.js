import {labelMap} from "../lib/serviceLabelsMap";

export default function ServicesTable({services}) {

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                {/*<div className="sm:flex-auto">*/}
                {/*    <h1 className="text-xl font-semibold text-gray-900">Service Providers</h1>*/}
                {/*    <p className="mt-2 text-sm text-gray-700">*/}
                {/*        A list of all the service providers available.*/}
                {/*    </p>*/}
                {/*</div>*/}
                {/*<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">*/}
                {/*    <button*/}
                {/*        type="button"*/}
                {/*        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"*/}
                {/*    >*/}
                {/*        Add service provider*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
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
                                        <td className=" px-1 py-1 text-sm text-gray-500 hidden md:table-cell">{labelMap[service.service]}</td>
                                        <td className=" px-1 text-sm text-gray-500 hidden md:table-cell">{service.county}</td>
                                        <td className="relative py-3 md:py-1 px-1 text-right text-sm font-medium sm:pr-6">
                                            <a href={"/referral/" + service._id}
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
