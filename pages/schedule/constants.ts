
import { ScheduleEvent } from '@/components/shared/schedule/types';
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
export const sessions: Array<ScheduleEvent> = [
    {
        name: 'Ever',
        subtitle: "03:30h · 6:30'",
        footer: 'Pista 4',
        start: '2023-04-01T03:30:00',
        end: '2023-04-01T06:30:00',
        spaceId: 300,
        color: '#039be5'
    },
    {
        name: 'Ever',
        subtitle: "03:30h · 04:30'",
        footer: 'Pista 5',
        start: '2023-04-02T03:30:00',
        end: '2023-04-02T04:30:00',
        spaceId: 300,
        color: '#039be5'
    },
    {
        name: 'Reunion',
        subtitle: "06:30h · 08:30'",
        footer: 'Pista 5',
        start: '2023-04-01T06:30:00',
        end: '2023-04-01T08:30:00',
        spaceId: 300,
        color: '#039be5'
    },
    {
        name: 'correr',
        subtitle: "01:30h · 03:30'",
        footer: 'Pista 6',
        start: '2023-04-05T01:30:00',
        end: '2023-04-05T03:30:00',
        spaceId: 300,
        color: '#039be5'
    },
    {
        name: 'Cinta',
        subtitle: "02:00h · 03:30'",
        footer: 'Pista 7',
        start: '2023-04-06T02:00:00',
        end: '2023-04-06T03:30:00',
        spaceId: 300,
        color: '#039be5'
    },
    {
        name: 'Evento random',
        subtitle: "01:00h · 02:00'",
        footer: 'Pista 7',
        start: '2023-04-07T01:00:00',
        end: '2023-04-07T02:00:00',
        spaceId: 300,
        color: '#039be5'
    },
    {
        name: 'Otro evento',
        subtitle: "23:00h · 00:00'",
        footer: 'Pista 7',
        start: '2023-04-03T23:00:00',
        end: '2023-04-03T00:00:00',
        spaceId: 300,
        color: '#039be5'
    }
]