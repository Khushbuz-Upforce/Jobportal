const ApplicationTable = ({ applications, onView, onStatusChange }) => {
    // if (applications.length === 0) return <p className="text-sm text-gray-500">No applications</p>;
    // console.log(applications, "Table");

    return (
        <table className="w-full border text-sm">
            <thead>
                <tr className="text-left bg-gray-100">
                    <th className="p-2">Applicant</th>
                    <th className="p-2">Job Title</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {applications.map((app) => (
                    <tr key={app._id} className="border-t">
                        <td className="p-2">{app.applicantName}</td>
                        <td className="p-2">{app.jobId.title}</td>
                        <td className="p-2">
                            <select
                                value={app.status}
                                onChange={(e) => onStatusChange(app._id, e.target.value)}
                                className="border px-2 py-1 rounded"
                            >
                                <option value="TODO">TODO</option>
                                <option value="Screening Round">Screening Round</option>
                                <option value="Technical Round">Technical Round</option>
                                <option value="Virtual Round">Virtual Round</option>
                                <option value="Selected">Selected</option>
                                <option value="Hired">Hired</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </td>
                        <td className="p-2">
                            <button
                                className="text-blue-600 underline"
                                onClick={() => onView(app)}
                            >
                                View
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ApplicationTable;
