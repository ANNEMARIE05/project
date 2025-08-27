import { 
  Menu,
  Bell,
  User
} from "lucide-react";
import { useState } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
  user?: {
    name: string;
    avatar?: string;
  };
  notifications?: Notification[];
}

export default function Header({ 
  onMenuClick, 
  title = "Dashboard",
  user = { name: "Administrateur" },
  notifications = []
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-white/40 shadow-sm">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="ml-4 lg:ml-0 text-lg font-semibold text-gray-900 capitalize tracking-tight">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50 relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Marquer tout comme lu
                  </button>
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p>Aucune notification</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border-b border-gray-100 hover:bg-blue-50/50 cursor-pointer ${
                        !notification.read ? 'bg-blue-50/70' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="p-4 border-t border-gray-100">
                  <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Voir toutes les notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-100">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center shadow">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-800 hidden sm:block">{user.name}</span>
        </div>
      </div>
    </header>
  );
} 