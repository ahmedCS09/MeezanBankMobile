import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAgent } from '../context/AgentContext';

export default function AgentSpeechBanner() {
  const { flowGuidance, clearHighlight } = useAgent();

  if (!flowGuidance) return null;

  return (
    <View style={styles.bannerContainer}>
      <View style={styles.speechPill}>
        <View style={styles.botIconBadge}>
          <Text style={styles.botIconText}>🤖</Text>
        </View>
        <Text style={styles.guidanceText}>{flowGuidance}</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={clearHighlight}>
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    zIndex: 10000,
    alignItems: 'center',
  },
  speechPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b1259',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#caace3',
  },
  botIconBadge: {
    marginRight: 8,
  },
  botIconText: {
    fontSize: 18,
  },
  guidanceText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'right',
  },
  closeBtn: {
    marginLeft: 10,
    padding: 4,
  },
  closeBtnText: {
    color: '#caace3',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
