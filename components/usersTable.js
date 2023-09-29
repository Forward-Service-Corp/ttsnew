import Link from "next/link";
import {useState} from "react";
import moment from "moment";

export default function UsersTable({users}) {
    const [searchTerm, setSearchTerm] = useState("")
    const [userType, setUserType] = useState("client")
    const evaluateDate = (date) => {
        const now = moment()
        const days = now.diff(date, "days")
        if(days > 5){
            return <span className={`text-green-600`}>{moment(date).calendar()}</span>
        }else{
            return <span className={`text-gray-500`}>{moment(date).calendar()}</span>
        }
    }
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
                <div className={"rounded border border-gray-300"}>
                    <input type="text"
                           className={"text-xs border-gray-300 border-0 rounded focus:ring-0 "}
                           value={searchTerm}
                           placeholder={"Search users..."}
                           onChange={(e) => {
                        setSearchTerm(e.target.value)
                    }}/>
                    <select
                        className={"text-xs border-gray-300 border-0 rounded focus:ring-0"}
                        defaultValue={`client`}
                        onChange={(e) => {
                        setUserType(e.target.value)
                    }}>
                        <option value={""}>All</option>
                        <option value={"client"}>Client</option>
                        <option value={"coach"}>Coach</option>
                        <option value={"admin"}>Admin</option>
                    </select>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                                        Phone
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                                        Email
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                                        Level
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                                        Coaches
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                                        Latest Coach Update
                                    </th>

                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">View</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {users && users.filter(person => person.email?.toLowerCase().includes(searchTerm.toLowerCase()) || person.name?.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .filter(person => person.level?.includes(userType.toString()))
                                    .map((person) => (
                                    <tr key={person.email}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-medium text-gray-900 sm:pl-6">
                                            {person.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">{person.phone}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">{person.email}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">{person.level}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                                            {person.coach?.toString().split('').length > 0 ? person.coach.toString().split(',').length : ''}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                                            {person.coachUpdate ? evaluateDate(person.coachUpdate) : <span className={`text-red-600`}>Missing</span>}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-xs font-medium sm:pr-6">
                                            <Link href={"/user/" + person._id}>
                                                <a className="text-orange-600 hover:text-orange-900">
                                                    View/Edit<span className="sr-only">, {person.name}</span>
                                                </a>
                                            </Link>
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
