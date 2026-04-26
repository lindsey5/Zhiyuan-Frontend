import { BarChartBig, Bell, ClipboardList, Repeat, ShoppingCart, Star, Undo2 } from "lucide-react";
import IconButton from "../ui/IconButton";
import { useEffect, useState } from "react";
import useNotifications from "../../hooks/useNotifications";
import Card from "../ui/Card";
import { useThemeStore } from "../../lib/store/themeStore";
import { cn, timeAgo } from "../../utils/utils";
import Button from "../ui/Button";
import type { UserNotification } from "../../types/userNotification.type";
import NotificationModal from "./NotificationModal";
import StockTransferItems from "../stockTransferLog/StockTransferItems";

function getIcon (notification : UserNotification, isDark : boolean) {
    if(notification.saleNotification){
        return (
            <BarChartBig
                className="flex-shrink-0  text-inverse bg-gold rounded-full w-10 h-10 p-2" 
            />
        )
    }

    if(notification.returnNotification){
        return (
            <Undo2
                className="flex-shrink-0  text-inverse bg-gold rounded-full w-10 h-10 p-2" 
            />
        )
    }

    if(notification.stockTransferNotification) {
        return (
            <Repeat 
                className="flex-shrink-0  text-inverse bg-gold rounded-full w-10 h-10 p-2" 
            />
        )
    }

    if(notification.stockOrderNotification) {
        return (
            <ShoppingCart
                className="flex-shrink-0  text-inverse bg-gold rounded-full w-10 h-10 p-2" 
            />
        )
    }

    if(notification.orderNotification) {
        return (
            <ClipboardList
                className="flex-shrink-0  text-inverse bg-gold rounded-full w-10 h-10 p-2" 
            />
        )
    }

    if(notification.sponsoredItemNotification) {
        return (
            <Star
                className="flex-shrink-0  text-inverse bg-gold rounded-full w-10 h-10 p-2" 
            />
        )
    }

    return (
        <Bell 
            fill={isDark ? "#313131" : "#fff" } 
            className="flex-shrink-0  text-inverse bg-gold rounded-full w-10 h-10 p-2" 
        />
    )
}

export default function NotificationBell () {
    const { isDark } = useThemeStore();
    const [notification, setNotification] = useState<UserNotification | null>(null);
    const { unread, notifications, setPage, page, totalPages, isFetching, readNotification, readAllNotifications } = useNotifications();
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        document.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('#notification-bell')) setShowDropdown(false);
        });

    }, [])

    const handleReadNotification = async(notification : UserNotification) => {
        if(!readNotification) return;

        if(notification.orderNotification) {
            window.location.href = `/dashboard/orders?order_id=${notification.orderNotification.order.order_id}`
        }else if(notification.stockOrderNotification){
             window.location.href = `/dashboard/distributors/stock-orders?stock_order_id=${notification.stockOrderNotification.stockOrder.stock_order_id}`
        }else if(notification.sponsoredItemNotification){
            window.location.href = `/dashboard/sponsored-products?sponsored_id=${notification.sponsoredItemNotification.sponsored_item.sponsored_id}`
        }
        
        else setNotification(notification);
        
        if(notification.status === 'unread') await readNotification(notification._id);
    }

    return (
        <div id="notification-bell" className="relative">
            {notification?.stockTransferNotification ? (
                <StockTransferItems 
                    close={() => setNotification(null)}
                    open={notification && notification.stockTransferNotification !== undefined}
                    transfer_id={notification.stockTransferNotification.stock_transfer_id}
                />
            ) : (
                <NotificationModal 
                    close={() => setNotification(null)}
                    open={notification !== null}
                    notification={notification}
                />
            )}
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
                <Card className="max-h-100 overflow-y-auto p-4 w-[70vw] space-y-2 md:w-80 absolute right-0 transform  transform md:right-1">
                    <div className="flex items-center justify-between">
                        <h1 className="font-bold">Notifications</h1>
                        <button className="text-sm text-gold cursor-pointer" onClick={readAllNotifications}>Mark all as Read</button>
                    </div>
                    <div className="bg-[var(--border-panel)] mt-3 mb-5 h-[1px]"></div>
                    {!notifications.length && !isFetching && <p className="w-full text-center text-sm">No notifications yet</p>}
                    {notifications.map(notification => (
                        <button 
                            key={notification._id}
                            className={cn(
                                "relative border border-[var(--border-panel)] rounded-md cursor-pointer w-full p-3 flex gap-3 hover:opacity-70 items-center",
                                notification.status === 'read' && 'opacity-60'
                            )}
                            onClick={() => handleReadNotification(notification)}
                        >
                            {getIcon(notification, isDark)}
                            <div className="flex flex-col items-start space-y-1">
                                <p className={cn(
                                    "text-xs break-words text-start",
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
                            className={cn(
                                "text-xs",
                                isFetching ? "hidden" : "block"
                            )}
                            label="See more"
                            disabled={isFetching}
                            onClick={() => {
                                if(setPage) setPage(prev => prev + 1)
                            }}
                        />
                    </div>
                </Card>
            )}
        </div>
    )
}