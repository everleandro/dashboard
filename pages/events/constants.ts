
import ScheduleEvent from '~~/models/Event';
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
export const events: Array<ScheduleEvent> = [
    new ScheduleEvent({
        name: 'Ever',
        subtitle: "03:30h · 6:30' - 11",
        footer: 'Pista 4',
        start: '2023-04-11T03:30:00',
        end: '2023-04-11T06:30:00',
        entityId: 300,
        roles: [1, 2],
        user: 1,
        activityId: 1,
        target: 12,
    }),
    new ScheduleEvent({
        name: 'Ever',
        subtitle: "03:30h · 04:30' - 13",
        footer: 'Pista 5',
        start: '2023-04-13T03:30:00',
        end: '2023-04-13T04:30:00',
        entityId: 300,
        color: 'carnation',
        roles: [1, 2, 3],
        user: 1,
        activityId: 2,
        target: 12,
    }),
    new ScheduleEvent({
        name: 'Reunion',
        subtitle: "07:30h · 10:00' - 11",
        footer: 'Pista 5',
        start: '2023-04-11T07:30:00',
        end: '2023-04-11T10:00:00',
        entityId: 300,
        color: 'biloba-flower',
        roles: [1, 6],
        user: 1,
        target: 12,
        activityId: 3,
        rotating: true
    }),
    new ScheduleEvent({
        name: 'correr',
        subtitle: "01:30h · 03:30' - 14",
        footer: 'Pista 6',
        start: '2023-04-14T01:30:00',
        end: '2023-04-14T03:30:00',
        entityId: 300,
        color: 'carnation',
        roles: [1, 3],
        activityId: 4,
        user: 1,
        target: 12,
    }),
    new ScheduleEvent({
        name: 'Cinta',
        subtitle: "02:00h · 03:30'",
        footer: 'Pista 7',
        start: '2023-04-15T02:00:00',
        end: '2023-04-15T03:30:00',
        entityId: 300,
        color: 'salmon',
        roles: [2],
        user: 1,
        activityId: 5,
        target: 12,
    }),
    new ScheduleEvent({
        name: 'Evento random',
        subtitle: "01:00h · 02:00' - 14",
        footer: 'Pista 7',
        start: '2023-04-14T01:00:00',
        end: '2023-04-14T02:00:00',
        entityId: 300,
        roles: [5],
        activityId: 1,
        user: 1,
        target: 2,
        rotating: true
    }),
    new ScheduleEvent({
        name: 'Otro evento',
        subtitle: "23:00h · 00:00' - 16",
        footer: 'Pista 7',
        start: '2023-04-16T23:00:00',
        end: '2023-04-16T00:00:00',
        entityId: 300,
        activityId: 2,
        color: 'biloba-flower',
        roles: [2],
        user: 1,
        dateChange: new Date(),
        target: 1,
    })
]