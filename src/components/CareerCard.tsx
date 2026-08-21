import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GlassCard from './GlassCard';
import { Colors } from '../theme/colors';

type Career = {
  title: string;
  description: string;
  level: string;
  skills: string[];
  duration: string;
  demand: number;
  salaryRange: string;
  emoji: string;
  color: string;
};

type Props = {
  career: Career;
  onPress?: (career: Career) => void;
};

export default function CareerCard({ career, onPress }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.92} onPress={() => onPress?.(career)}>
      <GlassCard style={styles.card}>
        <View style={styles.row}>
          


          <View style={styles.main}>
            <View style={styles.topRow}>
              <Text style={styles.title}>{career.title}</Text>

              <View style={[styles.levelPill, { backgroundColor: `${career.color}25` }]}>
                <Text style={[styles.levelText, { color: career.color }]}>
                  {career.level}
                </Text>
              </View>
            </View>

            <Text style={styles.desc}>{career.description}</Text>

            <View style={styles.skillsRow}>
              {career.skills.slice(0, 3).map((skill) => (
                <View key={skill} style={styles.skillPill}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>

            <View style={styles.bottom}>
              <Text style={styles.meta}> {career.duration}</Text>
              <Text style={styles.meta}> {career.demand}%</Text>
              <Text style={[styles.salary, { color: career.color }]}>
                {career.salaryRange}
              </Text>
            </View>
          </View>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  
  },
  main: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    color: Colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginRight: 8,
  },
  levelPill: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
  },
  levelText: {
    fontSize: 10,
    fontWeight: '900',
  },
  desc: {
    color: Colors.textSoft,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 11,
  },
  skillPill: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    color: Colors.textSoft,
    fontSize: 11,
    fontWeight: '800',
  },
  bottom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    alignItems: 'center',
  },
  meta: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    marginRight: 10,
  },
  salary: {
    fontSize: 12,
    fontWeight: '900',
  },
});