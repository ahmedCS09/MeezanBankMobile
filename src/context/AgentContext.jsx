import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  connectAgent,
  disconnectAgent,
  subscribeAgent,
  sendScreenChange,
  sendAgentUtterance,
} from '../services/agentBridge';

const AgentContext = createContext({
  highlightedIds: [],
  isHighlighted: () => false,
  clearHighlight: () => {},
  flowGuidance: null,
  agentConnected: false,
  activeScreen: 'Dashboard',
  reportScreen: () => {},
  speakToAgent: () => {},
});

export function AgentProvider({ children }) {
  const [highlightedIds, setHighlightedIds] = useState([]);
  const [flowGuidance, setFlowGuidance] = useState(null);
  const [agentConnected, setAgentConnected] = useState(false);
  const [activeScreen, setActiveScreen] = useState('Dashboard');

  const clearHighlight = useCallback(() => {
    setHighlightedIds([]);
    setFlowGuidance(null);
  }, []);

  const isHighlighted = useCallback(
    (id) => {
      if (!id || highlightedIds.length === 0) return false;
      return highlightedIds.includes(id);
    },
    [highlightedIds]
  );

  const reportScreen = useCallback((screenName) => {
    setActiveScreen(screenName);
    sendScreenChange(screenName);
  }, []);

  const speakToAgent = useCallback((text) => {
    sendAgentUtterance(text);
  }, []);

  useEffect(() => {
    connectAgent();

    let autoClearTimer = null;

    const unsubscribe = subscribeAgent((event) => {
      if (event.type === 'STATUS') {
        setAgentConnected(event.connected);
      } else if (event.type === 'AGENT_HIGHLIGHT') {
        const ids = Array.isArray(event.targetIds)
          ? event.targetIds
          : event.targetId
          ? [event.targetId]
          : [];
        setHighlightedIds(ids);
        if (event.flowGuidance) {
          setFlowGuidance(event.flowGuidance);
        }

        // Auto clear highlight after 8 seconds
        clearTimeout(autoClearTimer);
        autoClearTimer = setTimeout(() => {
          setHighlightedIds([]);
          setFlowGuidance(null);
        }, 8000);
      }
    });

    return () => {
      clearTimeout(autoClearTimer);
      unsubscribe();
      disconnectAgent();
    };
  }, []);

  return (
    <AgentContext.Provider
      value={{
        highlightedIds,
        isHighlighted,
        clearHighlight,
        flowGuidance,
        agentConnected,
        activeScreen,
        reportScreen,
        speakToAgent,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  return useContext(AgentContext);
}
