import React from 'react';
import {Trash} from "phosphor-react";

function AssignedClient({client, viewingUser, setCurrentClients}) {
    const [edit, setEdit] = React.useState(false);

    const handleChange = () => {
        setEdit(prevState => !prevState);
    }

    async function getClients() {
        await fetch("/api/get-clients?coachId=" + viewingUser._id.toString())
            .then(res => res.json())
            .then(res => {setCurrentClients(res)})
            .catch(err => console.warn(err))
    }

    const removeClient = async () => {
        try {
            const response = await fetch('/api/removeClientFromCoach', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clientId: client._id, userId: viewingUser._id }),
            });

            const data = await response.json();
            await getClients();


            console.log('Coach removed:', data);
        } catch (error) {
            console.error('Error adding coach:', error);
        }
    };

    return (
        <div className={`rounded-full text-xs font-extralight shadow`}>
            <div className={`${edit ? 'hidden' : 'visible'} flex justify-between rounded-full overflow-hidden`}>
                <div className={`bg-indigo-100 flex-grow px-4 py-2 text-black`}>{client.email}</div>
                <div className={`bg-red-500 px-4 py-2 flex items-center cursor-pointer`} onClick={handleChange}>
                    <Trash color={'white'} size={16}/>
                </div>
            </div>
            <div className={`${!edit ? 'hidden' : 'visible'} flex justify-between rounded-full overflow-hidden`}>
                <div className={`bg-gray-300 flex-1 px-4 py-2 text-gray-800 text-center cursor-pointer`} onClick={handleChange}>Cancel</div>
                <div className={`bg-red-500 flex-1 px-4 py-2 text-center text-white cursor-pointer`} onClick={removeClient}>Confirm</div>
            </div>
        </div>
    );
}

export default AssignedClient;
