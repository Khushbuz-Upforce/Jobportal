export default function ApplicationTable({ applications, onView }) {
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="p-2 text-left whitespace-nowrap ">ID</th>
                        <th className="p-2 text-left whitespace-nowrap">Applicant</th>
                        <th className="p-2 text-left whitespace-nowrap">Email</th>
                        <th className="p-2 text-left whitespace-nowrap">Job Title</th>
                        <th className="p-2 text-left whitespace-nowrap">Date</th>
                        <th className="p-2 text-left whitespace-nowrap">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app, i) => (
                        <tr key={app._id} className="border-t hover:bg-gray-50">
                            <td className="p-2">{++i}</td>
                            <td className="p-2">{app.applicantName}</td>
                            <td className="p-2">{app.email}</td>
                            <td className="p-2">{app.job?.title}</td>
                            <td className="p-2">{new Date(app.createdAt).toLocaleDateString()}</td>
                            <td className="p-2">
                                <button
                                    className="  text-blue-700 px-3 py-1 rounded text-xs md:text-sm"
                                    onClick={() => onView(app)}
                                >
                                    Detaile
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
