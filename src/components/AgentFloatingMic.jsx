import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { useAgent } from '../context/AgentContext';

export default function AgentFloatingMic() {
  const { agentConnected, speakToAgent } = useAgent();
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      speakToAgent(inputText.trim());
      setInputText('');
      setModalVisible(false);
    }
  };

  const handleQuickPrompt = (phrase) => {
    speakToAgent(phrase);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.floatingBtn,
          agentConnected ? styles.btnConnected : styles.btnDisconnected,
        ]}
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.micIcon}>🎙️</Text>
        {agentConnected && <View style={styles.onlineDot} />}
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Zenith Voice Assistant 🎙️</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              {agentConnected
                ? 'Connected to Voice Agent. Say or type a request:'
                : 'Connecting to ws://...'}
            </Text>

            <View style={styles.inputRow}>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. mera balance kitna hai..."
                placeholderTextColor="#999"
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                <Text style={styles.sendBtnText}>Ask</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.quickTitle}>Quick Voice Commands:</Text>
            <View style={styles.quickChips}>
              <TouchableOpacity
                style={styles.chip}
                onPress={() => handleQuickPrompt('mera balance kitna hai')}
              >
                <Text style={styles.chipText}>💰 Mera Balance</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.chip}
                onPress={() => handleQuickPrompt('Send money to Ahmed')}
              >
                <Text style={styles.chipText}>💸 Send Money</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.chip}
                onPress={() => handleQuickPrompt('bijli ka bill pay karna hai')}
              >
                <Text style={styles.chipText}>⚡ Pay Bill</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.chip}
                onPress={() => handleQuickPrompt('freeze my card')}
              >
                <Text style={styles.chipText}>💳 Freeze Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingBtn: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#6f2da8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 9999,
  },
  btnConnected: {
    backgroundColor: '#6f2da8',
  },
  btnDisconnected: {
    backgroundColor: '#888',
  },
  micIcon: {
    fontSize: 26,
  },
  onlineDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6f2da8',
  },
  modalClose: {
    fontSize: 20,
    color: '#888',
    padding: 4,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    height: 46,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#111',
  },
  sendBtn: {
    backgroundColor: '#6f2da8',
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  quickTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  quickChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#f3e8ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  chipText: {
    color: '#6f2da8',
    fontWeight: '600',
    fontSize: 13,
  },
});
