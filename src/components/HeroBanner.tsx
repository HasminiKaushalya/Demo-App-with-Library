import React from 'react';
import { ImageBackground, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video, { ReactVideoSource } from 'react-native-video';
import { Colors } from '../theme/colors';

type Stat = {
  value: string;
  label: string;
};

type Props = {
  title: string;
  subtitle: string;
  image?: ImageSourcePropType;
  videoSource?: ReactVideoSource | any;
  video?: any;
  stats?: Stat[];
  height?: number;
};

export default function HeroBanner({
  title,
  subtitle,
  image,
  videoSource,
  video,
  stats,
  height = 250,
}: Props) {
  const activeVideo = videoSource || video;

  const content = (
    <LinearGradient
      colors={['rgba(0,0,0,0.05)', 'rgba(11,16,32,0.45)', 'rgba(11,16,32,0.85)']}
      style={styles.overlay}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {stats ? (
          <View style={styles.statsRow}>
            {stats.map((item, index) => (
              <View key={index} style={styles.stat}>
                <Text style={styles.statValue}>{item.value}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </LinearGradient>
  );

  if (activeVideo) {
    return (
      <View style={[styles.wrap, { height }]}>
        <Video
          source={activeVideo}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
          repeat
          muted
          paused={false}
          controls={false}
          playInBackground={false}
          playWhenInactive={false}
          disableFocus
        />
        {content}
      </View>
    );
  }

  return (
    <ImageBackground
      source={image || { uri: '' }}
      style={[styles.wrap, { height }]}
      imageStyle={styles.image}
    >
      {content}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 22,
  },
  image: {
    borderRadius: 30,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 22,
  },
  title: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    maxWidth: '92%',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 18,
  },
  stat: {
    flex: 1,
    marginRight: 10,
    borderRadius: 18,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  statValue: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    marginTop: 3,
    fontWeight: '700',
  },
});
