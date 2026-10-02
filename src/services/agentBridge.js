/**
 * Agent Bridge for MeezanBankMobile.
 * Connects the React Native app to the Python Voice Agent via WebSocket.
 */
import { Platform } from 'react-native';

// -------------------------------------------------------------
// CLOUD DEPLOYMENT URL (Plug-and-play for phone APKs)
// When deployed to Render/Railway, paste your URL here, e.g.:
// export const CLOUD_AGENT_URL = 'wss://zenith-voice-agent.onrender.com/ws';
// When empty, it falls back to local dev (10.0.2.2 for Android emulator).
// -------------------------------------------------------------
export const CLOUD_AGENT_URL = '';

const DEFAULT_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
let SOCKET_URL = CLOUD_AGENT_URL || `ws://${DEFAULT_HOST}:8765/ws`;

let socket = null;
let reconnectTimer = null;
let reconnectAttempts = 0;
const listeners = new Set();

export function setAgentUrl(urlOrHost) {
  if (urlOrHost.startsWith('ws://') || urlOrHost.startsWith('wss://')) {
    SOCKET_URL = urlOrHost;
  } else {
    SOCKET_URL = `ws://${urlOrHost}:8765/ws`;
  }
  disconnectAgent();
  connectAgent();
}

export function setAgentHost(ipOrHost) {
  setAgentUrl(ipOrHost);
}

export function subscribeAgent(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function notifyListeners(event) {
  listeners.forEach((callback) => {
    try {
      callback(event);
    } catch (err) {
      console.error('[agentBridge] Listener error:', err);
    }
  });
}

export function connectAgent() {
  clearTimeout(reconnectTimer);
  try {
    socket = new WebSocket(SOCKET_URL);
  } catch (err) {
    console.log('[agentBridge] Connection init error:', err);
    scheduleReconnect();
    return;
  }

  socket.onopen = () => {
    console.log('[agentBridge] Connected to Python Voice Agent at', SOCKET_URL);
    reconnectAttempts = 0;
    notifyListeners({ type: 'STATUS', connected: true });
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      notifyListeners(data);
    } catch (err) {
      console.log('[agentBridge] Message parse error:', err);
    }
  };

  socket.onerror = (error) => {
    console.log('[agentBridge] WebSocket error:', error.message || error);
  };

  socket.onclose = () => {
    console.log('[agentBridge] Disconnected from agent. Reconnecting...');
    notifyListeners({ type: 'STATUS', connected: false });
    scheduleReconnect();
  };
}

export function disconnectAgent() {
  clearTimeout(reconnectTimer);
  if (socket) {
    socket.close();
    socket = null;
  }
}

function scheduleReconnect() {
  const delay = Math.min(2000 * 2 ** reconnectAttempts, 10000);
  reconnectAttempts += 1;
  reconnectTimer = setTimeout(connectAgent, delay);
}

export function sendAgentMessage(message) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.log('[agentBridge] Socket not open, unable to send:', message.type);
  }
}

export function sendScreenChange(screenName) {
  sendAgentMessage({
    type: 'AGENT_SCREEN_CHANGE',
    screen: screenName,
  });
}

export function sendAgentUtterance(text) {
  sendAgentMessage({
    type: 'AGENT_UTTERANCE',
    text: text,
  });
}
