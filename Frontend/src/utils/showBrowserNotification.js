// utils/showBrowserNotification.js

const showBrowserNotification = (notif) => {
    if ("Notification" in window && Notification.permission === "granted") {
        const notification = new Notification("New Application Received", {
            body: `${notif?.message || 'Someone'}`,
            icon: '/logo192.png' // fallback icon (place this in public folder)
        });
        notification.onclick = () => {
            window.focus();
        };
    }
};

export default showBrowserNotification;
