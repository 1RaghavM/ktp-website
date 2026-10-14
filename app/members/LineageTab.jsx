'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { grey } from '@mui/material/colors';

const lineage = [
  {
    name: 'Shriya Srinivasan',
    children: [
      { name: 'Aditi Sreeganesh', children: [{ name: 'Gravit Bali' }] },
      { name: 'Kesha Patel' },
    ],
  },
  {
    name: 'Manan Shah',
    children: [
      { name: 'Kshiraj Gupta', children: [{ name: 'Anant Gupta' }] },
      { name: 'Darsh Sundar' },
    ],
  },
  {
    name: 'Aishwarya Velagapudi',
    children: [
      {
        name: 'Shiven Patel',
        children: [
          {
            name: 'Jignasu Shah',
            children: [{ name: 'Krish Patel' }, { name: 'Advitya Suri' }],
          },
          { name: 'Heet Shah', children: [{ name: 'Vedavyas Painoori' }] },
        ],
      },
      {
        name: 'Raghul Srinivasan',
        children: [{ name: 'Gokulraj Kumarassamy' }],
      },
      { name: 'Radha Ghate', children: [{ name: 'Srinidhi Pappu' }] },
    ],
  },
  {
    name: 'Priyanghsu Bhowmik',
    children: [
      {
        name: 'Yugal Shah',
        children: [
          { name: 'Sujay Faldu', children: [{ name: 'Anish Allada' }] },
          { name: 'Nayan Yadav' },
        ],
      },
    ],
  },
  {
    name: 'Suhani Mehra',
    children: [
      { name: 'Gourika Dhiman', children: [{ name: 'Mira Kehair' }] },
      { name: 'Aaron Bansal' },
    ],
  },
  {
    name: 'Srimathi Vadivel',
    children: [
      {
        name: 'Yash Singh',
        children: [
          { name: 'Jayden Shah' },
          { name: 'Aditya Velagapudi' },
          { name: 'Anusha Iyer' },
        ],
      },
      { name: 'Priya Rana', children: [{ name: 'Anvi Khambadkone' }] },
      {
        name: 'Esha Pai',
        children: [
          { name: 'Jyothika Akkineni' },
          { name: 'Godasrita Dintakurti' },
        ],
      },
    ],
  },
  {
    name: 'Akash Puzhakkal',
    children: [
      {
        name: 'Saatvik Kabra',
        children: [{ name: 'Krisha Bhagat' }, { name: 'Kaivalya Atigre' }],
      },
      {
        name: 'Krish Kharbanda',
        children: [{ name: 'Atul Marichetty' }, { name: 'Krish Bansal' }],
      },
    ],
  },
  {
    name: 'Anushka Kondur',
    children: [
      { name: 'Akhil Thuremella', children: [{ name: 'Krish Maske' }] },
    ],
  },
  {
    name: 'Ciera Simon',
    children: [
      { name: 'Abirami Jayakumar', children: [{ name: 'Abhiram Sajjala' }] },
    ],
  },
  { name: 'Sameer Jiandani' },
  {
    name: 'Ananya Ahlawat',
    children: [
      {
        name: 'Umair Siddiqui',
        children: [{ name: 'Ethan Bingemann' }, { name: 'Arnav Venkata' }],
      },
    ],
  },
];

const countDescendants = (node) =>
  (node.children || []).reduce((sum, c) => sum + 1 + countDescendants(c), 0);

const LineageNode = ({ node, depth = 0 }) => (
  <Box>
    <Box
      display="inline-block"
      px={1.5}
      py={0.5}
      my={0.5}
      borderRadius="999px"
      sx={{
        bgcolor: depth === 0 ? 'rgba(59,130,246,0.25)' : 'rgba(255, 255, 255, 0.08)',
        color: depth === 0 ? '#bfdbfe' : 'white',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: 14,
        fontWeight: depth === 0 ? 600 : 500,
      }}
    >
      {node.name}
    </Box>

    {node.children && node.children.length > 0 && (
      <Box
        ml={2.5}
        pl={2}
        sx={{ borderLeft: '1px solid rgba(255, 255, 255, 0.2)' }}
      >
        {node.children.map((child) => (
          <LineageNode key={child.name} node={child} depth={depth + 1} />
        ))}
      </Box>
    )}
  </Box>
);

export default function LineageTab() {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" width="100%">
      {lineage.map((root) => {
        const total = countDescendants(root);

        return (
          <Box
            key={root.name}
            m={2.5}
            p={3}
            width="320px"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(12px)',
              color: 'white',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.35)',
            }}
          >
            <LineageNode node={root} />
            <Typography sx={{ color: grey[400], fontSize: 12, mt: 1.5 }}>
              {total} {total === 1 ? 'descendant' : 'descendants'}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}