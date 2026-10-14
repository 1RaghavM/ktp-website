'use client';

import React, { useEffect, useMemo, useState } from 'react';
import styles from './LineageTab.module.css';

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
    name: 'Priyangshu Bhowmik',
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

// Keep matching explicit: namesakes must never share a photo based on first name.
const normalizeName = (name = '') => name.trim().replace(/\s+/g, ' ').toLowerCase();
const canonicalName = (name) => {
  const normalized = normalizeName(name);
  return normalized === 'priyanghsu bhowmik' ? 'priyangshu bhowmik' : normalized;
};
const familyMembers = (node) => [node, ...(node.children || []).flatMap(familyMembers)];

function Portrait({ name, member, root }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('');
  // The mapper's generic chapter icon is not a member headshot.
  const publicImage = member?.image?.trim();
  const image = publicImage && publicImage !== '/ktp-icon.png'
    ? publicImage
    : canonicalName(name) === 'raghul srinivasan' ? '/headshots/Beta/Raghul.jpg' : null;

  useEffect(() => setFailed(false), [image]);

  return (
    <span className={`${styles.portrait} ${root ? styles.rootPortrait : ''}`} aria-hidden="true">
      <span>{initials}</span>
      {image && !failed && (
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          style={{
            objectPosition: member?.cropPosition || 'center',
            transform: member?.cropScale ? `scale(${member.cropScale})` : undefined,
            transformOrigin: member?.cropOrigin || 'center',
          }}
        />
      )}
    </span>
  );
}

function MemberRow({ node, membersByName, root = false, size }) {
  const member = membersByName.get(canonicalName(node.name));
  return (
    <div className={`${styles.memberRow} ${root ? styles.rootRow : ''}`}>
      <Portrait key={member?.image || 'initials'} name={node.name} member={member} root={root} />
      <div className={styles.memberDetails}>
        {root ? (
          <h3 className={styles.rootName}>{node.name}</h3>
        ) : (
          <p className={styles.memberName}>{node.name}</p>
        )}
        {member?.class && <p className={styles.memberClass}>{member.class === 'Founding' ? 'Founding class' : `${member.class} class`}</p>}
        {root && <p className={styles.familySize}>{size} {size === 1 ? 'member' : 'members'} in this family</p>}
      </div>
    </div>
  );
}

function Branches({ nodes, membersByName }) {
  return (
    <ul className={styles.branches}>
      {nodes.map((node) => (
        <li className={styles.branch} key={node.name}>
          <MemberRow node={node} membersByName={membersByName} />
          {node.children?.length > 0 && <Branches nodes={node.children} membersByName={membersByName} />}
        </li>
      ))}
    </ul>
  );
}

export default function LineageTab({ members = [] }) {
  // Use the public directory, with only the explicit Raghul portrait exception above.
  const membersByName = useMemo(() => new Map(members.map((member) => [canonicalName(member.name), member])), [members]);

  return (
    <section className={styles.lineage} aria-label="Member lineage">
        <div className={styles.grid}>
          {lineage.map((root) => {
            const size = familyMembers(root).length;
            return (
              <article className={styles.family} key={root.name} aria-label={`${root.name} family`}>
                <MemberRow node={root} membersByName={membersByName} root size={size} />
                {root.children?.length > 0 ? (
                  <Branches nodes={root.children} membersByName={membersByName} />
                ) : (
                  <p className={styles.singleton}>Every family starts with one connection.</p>
                )}
              </article>
            );
          })}
        </div>
    </section>
  );
}
