import { Tabs } from 'expo-router';
import React from 'react';

import ChecklistIcon from '@/assets/icons/checklist.svg';
import GiftIcon from '@/assets/icons/gift.svg';
import HomeIcon from '@/assets/icons/home.svg';
import LetterIcon from '@/assets/icons/letter.svg';
import UserIcon from '@/assets/icons/user.svg';
import { HapticTab } from '@/components/haptic-tab';
import { Apercu, Colors } from '@/constants/theme';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        tabBarInactiveTintColor: Colors['light'].tabIconDefault,
        tabBarIconStyle: { 
          marginBottom: 4
        },
        tabBarLabelStyle: {
          fontFamily: Apercu.medium,
          fontSize: 11,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: 'Training',
          tabBarIcon: ({ color }) => <ChecklistIcon color={color} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="feedback"
        options={{
          title: 'Feedback',
          tabBarIcon: ({ color }) => <LetterIcon color={color} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color }) => <GiftIcon color={color} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Your Profile',
          tabBarIcon: ({ color }) => <UserIcon color={color} fill={color} />,
        }}
      />
    </Tabs>
  );
}
