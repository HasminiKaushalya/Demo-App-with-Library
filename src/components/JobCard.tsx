import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GlassCard from './GlassCard';
import { Colors } from '../theme/colors';

type Job = {
  id?: number | string;
  company: string;
  position: string;
  type: 'Full-time' | 'Contract' | 'Part-time';
  rating: number;
  applicants: number;
  tags: string[];
  location: string;
  salary: string;
  postedDays: number;
  color: string;
  isSaved?: boolean;
  isFeatured?: boolean;
};

type Props = {
  job: Job;
  onPress?: (job: Job) => void;
};

export default function JobCard({ job, onPress }: Props) {
  const [saved, setSaved] = useState(job.isSaved ?? false);

  const typeColor =
    job.type === 'Full-time'
      ? { bg: Colors.successSoft, text: Colors.success }
      : job.type === 'Contract'
      ? { bg: Colors.warningSoft, text: Colors.warning }
      : { bg: Colors.infoSoft, text: Colors.info };

  return (
    <TouchableOpacity activeOpacity={0.93} onPress={() => onPress?.(job)}>
      <GlassCard style={styles.card}>
        {job.isFeatured && (
          <View style={styles.featured}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}

        <View style={styles.top}>
          <View style={[styles.logoWrap, { backgroundColor: `${job.color}22` }]}>
            <View style={[styles.logoInner, { backgroundColor: job.color }]}>
              <Text style={styles.logoText}>{job.company.charAt(0)}</Text>
            </View>
          </View>

          <View style={styles.main}>
            <Text style={styles.company}>{job.company}</Text>
            <Text style={styles.position}>{job.position}</Text>

            <View style={styles.ratingRow}>
              <Text style={styles.rating}>{job.rating}</Text>
              <Text style={styles.dot}> · </Text>
              <Text style={styles.applied}>{job.applicants} applied</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => setSaved(!saved)} style={styles.saveBtn}>
            <Text style={[styles.saveIcon, saved && styles.saveActive]}>
              {saved ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tagsRow}>
          {job.tags.slice(0, 3).map((tag: string) => (
            <View key={tag} style={[styles.tag, { borderColor: `${job.color}55` }]}>
              <Text style={[styles.tagText, { color: job.color }]}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.left}>
            <Text style={styles.location}>{job.location}</Text>

            <View style={[styles.typePill, { backgroundColor: typeColor.bg }]}>
              <Text style={[styles.typeText, { color: typeColor.text }]}>
                {job.type}
              </Text>
            </View>
          </View>

          <Text style={styles.salary}>
            {job.salary}
            <Text style={styles.per}> /mo</Text>
          </Text>
        </View>

        <Text style={styles.posted}>
          {job.postedDays === 1 ? 'Posted today' : `Posted ${job.postedDays} days ago`}
        </Text>
      </GlassCard>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  featured: {
    alignSelf: 'flex-start',
    marginBottom: 14,
    backgroundColor: 'rgba(255,95,178,0.18)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  featuredText: {
    color: Colors.pink,
    fontSize: 11,
    fontWeight: '900',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoInner: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  main: {
    flex: 1,
  },
  company: {
    color: Colors.textSoft,
    fontSize: 13,
    fontWeight: '700',
  },
  position: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  rating: {
    color: Colors.yellow,
    fontSize: 12,
    fontWeight: '800',
  },
  dot: {
    color: Colors.textMuted,
  },
  applied: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  saveBtn: {
    padding: 4,
    marginLeft: 8,
  },
  saveIcon: {
    color: Colors.textMuted,
    fontSize: 22,
  },
  saveActive: {
    color: Colors.pink,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    marginBottom: 15,
  },
  tag: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '800',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: 14,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  location: {
    color: Colors.textSoft,
    fontSize: 13,
    fontWeight: '700',
    marginRight: 8,
  },
  typePill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '900',
  },
  salary: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  per: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  posted: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 10,
    fontWeight: '700',
  },
});