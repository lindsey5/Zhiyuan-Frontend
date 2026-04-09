import { Bell } from "lucide-react";
import IconButton from "../ui/IconButton";
import { useContext, useEffect, useState } from "react";
import { UserNotificationSocketContext } from "../../contexts/UserNotificationContext";
import Card from "../ui/Card";
import { useThemeStore } from "../../lib/store/themeStore";
import { cn, timeAgo } from "../../utils/utils";
import Button from "../ui/Button";

export default function NotificationBell () {
    const { isDark } = useThemeStore();
    const { unread, notifications, setPage, page, totalPages, isFetching } = useContext(UserNotificationSocketContext);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        document.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('#notification-bell')) setShowDropdown(false);
        });

    }, [])

    return (
        <>
        <div id="notification-bell" className="fixed top-1 lg:top-8 z-20 right-35 lg:right-42">
            <IconButton
                icon={(
                    <Bell 
                        size={25}
                        fill={isDark ? "#313131" : "#fff" } 
                        className="shadow-md drop-shadow-[0_2px_5px_var(--icon-shadow)] text-inverse bg-gold rounded-full w-10 h-10 p-2" 
                    />
                )}
                onClick={() => setShowDropdown(prev => !prev)}
            />
            {unread > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {unread}
                </span>
            )}
            {showDropdown && (
                <Card className="max-h-100 overflow-y-auto p-4 w-[70vw] space-y-2 md:w-80 absolute -right-20 transform  transform md:right-1">
                    <h1 className="font-bold">Notifications</h1>
                    <div className="bg-[var(--border-panel)] mt-3 mb-5 h-[1px]"></div>
                    {!notifications.length && !isFetching && <p className="w-full text-center text-sm">No notifications yet</p>}
                    {notifications.map(notification => (
                        <button className="relative border border-[var(--border-panel)] rounded-md cursor-pointer w-full p-3 flex gap-3 hover:opacity-70 items-center">
                            <Bell 
                                fill={isDark ? "#313131" : "#fff" } 
                                className="text-inverse bg-gold rounded-full w-10 h-10 p-2" 
                            />
                            <div className="flex flex-col items-start space-y-1">
                                <p className={cn(
                                    "text-xs break-all",
                                    notification.status === "unread" && 'font-bold'
                                )}>{notification.message}</p>
                                <p className="text-xs text-gray">{timeAgo(notification.createdAt)}</p>
                            </div>
                            {notification.status === 'unread' && <span className="bg-red-500 p-[6px] rounded-full absolute left-10 top-3"></span> }
                        </button>
                    ))}
                    {isFetching && <p className="w-full text-center text-sm text-gray">Loading...</p>}
                    <div className={cn(
                        "justify-center mt-2",
                        page < totalPages ? 'flex' : 'hidden'
                    )}>
                        <Button 
                            className="text-xs"
                            label={isFetching ? "Loading..." : "See more"}
                            disabled={isFetching}
                            onClick={() => {
                                if(setPage) setPage(prev => prev + 1)
                            }}
                        />
                    </div>
                </Card>
            )}
        </div>
        </>
    )
}