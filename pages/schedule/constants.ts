
import Workday from '~~/models/Workday';
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
export const workdays: Array<Workday> = [
    new Workday({
        name: 'Ever',
        id: 1,
        subtitle: "03:30h · 6:30'",
        footer: 'Pista 4',
        start: '2023-04-10T03:30:00',
        end: '2023-04-10T06:30:00',
        entityId: 300,
        color: 'carnation',
        roles: [1, 2],
        user: 1
    }),
    new Workday({
        name: 'Ever',
        id: 2,
        subtitle: "03:30h · 04:30'",
        footer: 'Pista 5',
        start: '2023-04-11T03:30:00',
        end: '2023-04-11T04:30:00',
        entityId: 300,
        color: 'carnation',
        roles: [1, 2, 3],
        user: 1
    }),
    new Workday({
        name: 'Reunion',
        id: 3,
        subtitle: "06:30h · 08:30'",
        footer: 'Pista 5',
        start: '2023-04-10T06:30:00',
        end: '2023-04-10T08:30:00',
        entityId: 300,
        color: 'salmon',
        roles: [1, 6],
        user: 1
    }),
    new Workday({
        name: 'correr',
        id: 4,
        subtitle: "01:30h · 03:30'",
        footer: 'Pista 6',
        start: '2023-04-13T01:30:00',
        end: '2023-04-13T03:30:00',
        entityId: 300,
        color: 'carnation',
        roles: [1, 3],
        user: 1
    }),
    new Workday({
        name: 'Cinta',

        id: 5,
        subtitle: "02:00h · 03:30'",
        footer: 'Pista 7',
        start: '2023-04-14T02:00:00',
        end: '2023-04-14T03:30:00',
        entityId: 300,
        color: 'biloba-flower',
        roles: [2],
        user: 1
    }),
    new Workday({
        name: 'Evento random',
        subtitle: "01:00h · 02:00'",
        footer: 'Pista 7',
        start: '2023-04-12T01:00:00',
        end: '2023-04-12T02:00:00',
        entityId: 300,
        color: 'biloba-flower',
        id: 5,
        roles: [5],
        user: 1
    }),
    new Workday({
        name: 'Otro evento',
        subtitle: "23:00h · 00:00'",
        footer: 'Pista 7',
        start: '2023-04-15T23:00:00',
        end: '2023-04-15T00:00:00',
        entityId: 300,
        id: 6,
        color: 'biloba-flower',
        roles: [2],
        user: 1
    })
]