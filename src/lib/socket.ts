import { Server } from 'socket.io';

interface User {
  id: string;
  name: string;
  email: string;
  joinedAt: Date;
}

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  type: 'user' | 'system' | 'ai';
}

interface Activity {
  id: string;
  type: 'user_joined' | 'user_left' | 'message_sent' | 'ai_query' | 'system_event';
  description: string;
  timestamp: Date;
  userId?: string;
  data?: any;
}

export const setupSocket = (io: Server) => {
  const connectedUsers = new Map<string, User>();
  const messages: Message[] = [];
  const activities: Activity[] = [];

  // Helper function to broadcast user count
  const broadcastUserCount = () => {
    io.emit('user_count', connectedUsers.size);
  };

  // Helper function to broadcast active users
  const broadcastActiveUsers = () => {
    const users = Array.from(connectedUsers.values());
    io.emit('active_users', users);
  };

  // Helper function to add activity
  const addActivity = (activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    activities.unshift(newActivity);
    
    // Keep only last 50 activities
    if (activities.length > 50) {
      activities.splice(50);
    }
    
    io.emit('new_activity', newActivity);
  };

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Send initial data
    socket.emit('initial_data', {
      messages: messages.slice(-50), // Last 50 messages
      activities: activities.slice(-20), // Last 20 activities
      userCount: connectedUsers.size,
    });

    // Handle user join
    socket.on('user_join', (userData: { name: string; email: string }) => {
      const user: User = {
        id: socket.id,
        name: userData.name,
        email: userData.email,
        joinedAt: new Date(),
      };
      
      connectedUsers.set(socket.id, user);
      
      // Broadcast to all clients
      io.emit('user_joined', user);
      broadcastUserCount();
      broadcastActiveUsers();
      
      addActivity({
        type: 'user_joined',
        description: `${user.name} joined the platform`,
        userId: user.id,
      });

      // Send welcome message
      socket.emit('message', {
        id: Date.now().toString(),
        text: `Welcome to the platform, ${user.name}!`,
        senderId: 'system',
        senderName: 'System',
        timestamp: new Date(),
        type: 'system',
      });
    });

    // Handle messages
    socket.on('message', (msg: { text: string; type?: 'user' | 'ai' }) => {
      const user = connectedUsers.get(socket.id);
      if (!user) return;

      const message: Message = {
        id: Date.now().toString(),
        text: msg.text,
        senderId: socket.id,
        senderName: user.name,
        timestamp: new Date(),
        type: msg.type || 'user',
      };

      messages.push(message);
      
      // Keep only last 100 messages
      if (messages.length > 100) {
        messages.splice(0, messages.length - 100);
      }

      // Broadcast to all clients
      io.emit('message', message);

      // Add activity
      addActivity({
        type: msg.type === 'ai' ? 'ai_query' : 'message_sent',
        description: `${user.name} sent a ${msg.type === 'ai' ? 'AI query' : 'message'}`,
        userId: user.id,
        data: { messageId: message.id },
      });
    });

    // Handle AI response simulation (for demo purposes)
    socket.on('ai_response', (data: { queryId: string; response: string }) => {
      const message: Message = {
        id: Date.now().toString(),
        text: data.response,
        senderId: 'ai',
        senderName: 'AI Assistant',
        timestamp: new Date(),
        type: 'ai',
      };

      messages.push(message);
      io.emit('message', message);

      addActivity({
        type: 'ai_query',
        description: 'AI responded to query',
        data: { queryId: data.queryId, responseId: message.id },
      });
    });

    // Handle typing indicators
    socket.on('typing_start', () => {
      const user = connectedUsers.get(socket.id);
      if (user) {
        socket.broadcast.emit('user_typing', {
          userId: socket.id,
          userName: user.name,
          isTyping: true,
        });
      }
    });

    socket.on('typing_stop', () => {
      socket.broadcast.emit('user_typing', {
        userId: socket.id,
        isTyping: false,
      });
    });

    // Handle system notifications
    socket.on('system_notification', (notification: { title: string; message: string; type?: 'info' | 'success' | 'warning' | 'error' }) => {
      const user = connectedUsers.get(socket.id);
      if (!user) return;

      io.emit('notification', {
        id: Date.now().toString(),
        title: notification.title,
        message: notification.message,
        type: notification.type || 'info',
        timestamp: new Date(),
        senderName: user.name,
      });
    });

    // Handle real-time analytics
    socket.on('analytics_event', (event: { type: string; data: any }) => {
      const user = connectedUsers.get(socket.id);
      if (!user) return;

      // Broadcast analytics event to all connected clients
      io.emit('analytics_update', {
        type: event.type,
        data: event.data,
        timestamp: new Date(),
        userId: socket.id,
        userName: user.name,
      });
    });

    // Handle file sharing events
    socket.on('file_shared', (fileData: { name: string; size: number; type: string }) => {
      const user = connectedUsers.get(socket.id);
      if (!user) return;

      io.emit('file_shared', {
        id: Date.now().toString(),
        fileName: fileData.name,
        fileSize: fileData.size,
        fileType: fileData.type,
        sharedBy: user.name,
        sharedAt: new Date(),
      });

      addActivity({
        type: 'system_event',
        description: `${user.name} shared a file: ${fileData.name}`,
        userId: user.id,
        data: { fileName: fileData.name, fileSize: fileData.size },
      });
    });

    // Handle custom events
    socket.on('custom_event', (event: { type: string; data: any; broadcast?: boolean }) => {
      const user = connectedUsers.get(socket.id);
      if (!user) return;

      const enhancedEvent = {
        ...event,
        id: Date.now().toString(),
        timestamp: new Date(),
        userId: socket.id,
        userName: user.name,
      };

      if (event.broadcast) {
        io.emit('custom_event', enhancedEvent);
      } else {
        socket.emit('custom_event', enhancedEvent);
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      
      const user = connectedUsers.get(socket.id);
      if (user) {
        connectedUsers.delete(socket.id);
        
        // Broadcast to all clients
        io.emit('user_left', { userId: socket.id, userName: user.name });
        broadcastUserCount();
        broadcastActiveUsers();
        
        addActivity({
          type: 'user_left',
          description: `${user.name} left the platform`,
          userId: user.id,
        });
      }
    });

    // Send periodic updates
    setInterval(() => {
      if (connectedUsers.has(socket.id)) {
        socket.emit('heartbeat', {
          timestamp: new Date(),
          userCount: connectedUsers.size,
        });
      }
    }, 30000); // Every 30 seconds
  });

  // Global system events
  setInterval(() => {
    if (connectedUsers.size > 0) {
      addActivity({
        type: 'system_event',
        description: `System health check - ${connectedUsers.size} active users`,
      });
    }
  }, 300000); // Every 5 minutes
};