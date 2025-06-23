import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, PlusCircle, PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const usersData = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" },
    { id: 4, name: "Bob Brown", email: "bob@example.com" },
    { id: 5, name: "Charlie Black", email: "charlie@example.com" },
    { id: 6, name: "Dana White", email: "dana@example.com" },
    { id: 7, name: "Eve Adams", email: "eve@example.com" },
    { id: 8, name: "Frank Zane", email: "frank@example.com" },
    { id: 9, name: "Grace Lee", email: "grace@example.com" },
    { id: 10, name: "Henry Ford", email: "henry@example.com" },
    { id: 11, name: "Isaac Newton", email: "isaac@example.com" },
    { id: 12, name: "Jane Doe", email: "janed@example.com" }
];

const UserTable = () => {
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredUsers = useMemo(() => {
        let filtered = usersData.filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        );

        filtered.sort((a, b) => {
            const valA = a[sortKey].toLowerCase();
            const valB = b[sortKey].toLowerCase();
            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [search, sortKey, sortOrder]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (key) => {
        if (key === sortKey) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    return (
        <div className="max-w-5xl mx-auto pt-5">
            <h1 className="text-2xl font-semibold  mb-3 ">User List</h1>
            <div className='flex justify-between align-center'>
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-75 px-3 py-2 border  rounded-lg mb-4 text-sm"
                />
                <Link to={'/admin/addUser'}>
                    <button className='btn hidden md:flex bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700'>
                        Add User
                    </button>
                    <PlusIcon size={34} className='btn md:hidden bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700' />
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-sm border border-gray-300 rounded shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>ID</th>
                            <th
                                onClick={() => handleSort('name')}
                                className="px-4 py-2 cursor-pointer text-left"
                            >
                                Name {sortKey === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th
                                onClick={() => handleSort('email')}
                                className="px-4 py-2 cursor-pointer text-left"
                            >
                                Email {sortKey === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th

                                className="px-4 py-2 cursor-pointer text-left"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.length > 0 ? (
                            paginatedUsers.map((user, i) => (
                                <tr key={user.id} className="border-t">
                                    <td className="px-4 py-2">{user.id}</td>
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className='flex align-center text-center gap-2' >
                                        <button className='btn px-3 py-1 bg-green-400 text-[12px] font-semibold 
                                   hover:text-white rounded-full' >Edit</button>
                                        <button className='btn px-3 py-1 bg-red-400 text-[12px] font-semibold hover:text-white rounded-full'>Delet</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center px-4 py-4">No results found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                >
                    <ChevronLeft size={16} /> Prev
                </button>

                <span className="text-sm">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                >
                    Next <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
export default UserTable;
