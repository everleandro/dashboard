
import Session from '@/models/session';
export const spaces = [
    {
        label: 'Sala Fitness',
        id: 300
    },
    {
        label: 'Quickstart',
        id: 301
    },
    {
        label: 'Pista 1',
        id: 794
    },
    {
        label: 'Pista 2',
        id: 795
    },
    {
        label: 'Pista 3',
        id: 796
    },
    {
        label: 'Pista 4',
        id: 797
    },
    {
        label: 'Pista 5',
        id: 798
    },
    {
        label: 'Pista 6',
        id: 799
    },
    {
        label: 'Pista 7',
        id: 800
    }
]
export const sessions: Array<Session> = [
    {
        name: 'Ever',
        subtitle: "03:30h · 6:30'",
        footer: 'Pista 4',
        start: '2023-04-10T03:30:00',
        end: '2023-04-10T06:30:00',
        entityId: 300,
        color: 'carnation',
        roles: [1, 2],
        user: 1
    },
    {
        name: 'Ever',
        subtitle: "03:30h · 04:30'",
        footer: 'Pista 5',
        start: '2023-04-11T03:30:00',
        end: '2023-04-11T04:30:00',
        entityId: 300,
        color: 'carnation',
        roles: [1, 2, 3],
        user: 1
    },
    {
        name: 'Reunion',
        subtitle: "06:30h · 08:30'",
        footer: 'Pista 5',
        start: '2023-04-10T06:30:00',
        end: '2023-04-10T08:30:00',
        entityId: 300,
        color: 'salmon',
        roles: [1, 6],
        user: 1
    },
    {
        name: 'correr',
        subtitle: "01:30h · 03:30'",
        footer: 'Pista 6',
        start: '2023-04-13T01:30:00',
        end: '2023-04-13T03:30:00',
        entityId: 300,
        color: 'carnation',
        roles: [1, 3],
        user: 1
    },
    {
        name: 'Cinta',
        subtitle: "02:00h · 03:30'",
        footer: 'Pista 7',
        start: '2023-04-14T02:00:00',
        end: '2023-04-14T03:30:00',
        entityId: 300,
        color: 'biloba-flower',
        roles: [2],
        user: 1
    },
    {
        name: 'Evento random',
        subtitle: "01:00h · 02:00'",
        footer: 'Pista 7',
        start: '2023-04-12T01:00:00',
        end: '2023-04-12T02:00:00',
        entityId: 300,
        color: 'biloba-flower',
        roles: [5],
        user: 1
    },
    {
        name: 'Otro evento',
        subtitle: "23:00h · 00:00'",
        footer: 'Pista 7',
        start: '2023-04-15T23:00:00',
        end: '2023-04-15T00:00:00',
        entityId: 300,
        color: 'biloba-flower',
        roles: [2],
        user: 1
    }
]