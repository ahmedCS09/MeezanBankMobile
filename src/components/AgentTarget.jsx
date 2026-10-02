import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useAgent } from '../context/AgentContext';

export default function AgentTarget({ id, aliases = [], children, style }) {
  const { isHighlighted, clearHighlight } = useAgent();

  const allIds = [id, ...(aliases || [])];
  const highlighted = allIds.some((targetId) => isHighlighted(targetId));

  // Pulse animation for border/glow
  const pulseAnim = useRef(new Animated.Value(0)).current;
  // Bounce animation for the arrow
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (highlighted) {
      const pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: false,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 700,
            useNativeDriver: false,
          }),
        ])
      );

      const bounceLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 8,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
        ])
      );

      pulseLoop.start();
      bounceLoop.start();

      return () => {
        pulseLoop.stop();
        bounceLoop.stop();
        pulseAnim.setValue(0);
        bounceAnim.setValue(0);
      };
    }
  }, [highlighted]);

  const borderColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#caace3', '#6f2da8'],
  });

  const borderWidth = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 5],
  });

  return (
    <View style={[styles.wrapper, style]}>
      {highlighted && (
        <Animated.View
          style={[
            styles.arrowContainer,
            { transform: [{ translateY: bounceAnim }] },
          ]}
        >
          <Text style={styles.arrowText}>▼</Text>
          <View style={styles.pulseDot} />
        </Animated.View>
      )}

      {highlighted ? (
        <Animated.View
          style={[
            styles.highlightRing,
            {
              borderColor: borderColor,
              borderWidth: borderWidth,
            },
          ]}
        >
          {children}
        </Animated.View>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  arrowContainer: {
    position: 'absolute',
    top: -36,
    left: '50%',
    marginLeft: -16,
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 28,
    color: '#6f2da8',
    fontWeight: 'bold',
    textShadowColor: 'white',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6f2da8',
    marginTop: -4,
  },
  highlightRing: {
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#6f2da8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
});
