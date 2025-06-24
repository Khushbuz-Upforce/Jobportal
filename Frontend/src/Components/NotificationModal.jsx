import React from "react";

const NotificationModal = ({ notifications, onClose, onClear }) => {
    return (
        <div className="fixed top-16 right-4 left-4 sm:right-6 sm:left-auto z-50 flex justify-end sm:justify-center items-start sm:items-center">
            <div className="bg-white rounded-xl p-4 w-full sm:w-96 max-h-[80vh] shadow-lg overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <div className="flex items-center gap-2">
                        {notifications.length > 0 && (
                            <button
                                onClick={onClear}
                                className="text-sm text-red-500 hover:underline"
                            >
                                Clear All
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-red-500 text-xl leading-none"
                        >
                            &times;
                        </button>
                    </div>
                </div>

                <ul className="space-y-2">
                    {notifications.length > 0 ? (
                        notifications.map((notif, index) => (
                            <li
                                key={index}
                                className="border p-2 rounded text-sm text-gray-700"
                            >
                                {notif.message}
                            </li>
                        ))
                    ) : (
                        <li className="text-sm text-gray-500">No notifications</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default NotificationModal;
