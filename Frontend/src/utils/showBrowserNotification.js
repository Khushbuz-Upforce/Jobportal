// utils/showBrowserNotification.js

const showBrowserNotification = (notif) => {
    if ("Notification" in window && Notification.permission === "granted") {
        const notification = new Notification("New Application Received", {
            body: `${notif?.applicantName || 'Someone'} applied for ${notif?.jobTitle || 'a job'}`,
            icon: '/logo192.png' // fallback icon (place this in public folder)
        });
        notification.onclick = () => {
            window.focus();
        };
    }
};

export default showBrowserNotification;
