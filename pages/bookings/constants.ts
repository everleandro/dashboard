
import Booking from '~~/models/Booking';
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

export const bookings: Array<Booking> = [
    new Booking({
        name: 'Ever',
        id: 1,
        subtitle: "03:30h · 6:30' - 11",
        footer: 'Pista 4',
        start: '2023-04-11T03:30:00',
        end: '2023-04-11T06:30:00',
        entityId: 300,
        user: { name: 'User 1', id: 1, email: 'as1@asd.com', phone: '123 345 678', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
        employee: { name: 'User 4', id: 4, email: 'as4@asd.com', phone: '876 895 234', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
        color: 'primary',
        product: { name: '108 horas bajo el sol', id: 1 },
    }),
    new Booking({
        name: 'Ever',
        id: 2,
        subtitle: "03:30h · 04:30' - 13",
        footer: 'Pista 5',
        start: '2023-04-13T03:30:00',
        end: '2023-04-13T04:30:00',
        entityId: 300,
        employee: { name: 'User 4', id: 4, email: 'as4@asd.com', phone: '876 895 234', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
        user: { name: 'User 1', id: 1, email: 'as1@asd.com', phone: '123 345 678', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
        color: 'carnation',
        product: { name: 'Afrodance', id: 2 },
    }),
    new Booking({
        name: 'Reunion',
        id: 3,
        user: { name: 'User 1', id: 1, email: 'as1@asd.com', phone: '123 345 678', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
        employee: { name: 'User 4', id: 4, email: 'as4@asd.com', phone: '876 895 234', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
        subtitle: "07:30h · 10:00' - 11",
        footer: 'Pista 5',
        start: '2023-04-11T07:30:00',
        end: '2023-04-11T10:00:00',
        entityId: 300,
        color: 'biloba-flower',
        product: { name: 'Bachata', id: 3 },
    }),
    new Booking({
        name: 'correr',
        id: 4,
        user: { name: 'User 1', id: 1, email: 'as1@asd.com', phone: '123 345 678', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
        employee: { name: 'User 4', id: 4, email: 'as4@asd.com', phone: '876 895 234', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
        subtitle: "01:30h · 03:30' - 14",
        footer: 'Pista 6',
        start: '2023-04-14T01:30:00',
        end: '2023-04-14T03:30:00',
        entityId: 300,
        color: 'carnation',
        product: { name: 'Americano Padel', id: 4 },
    }),
    new Booking({
        name: 'Cinta',
        user: { name: 'User 1', id: 1, email: 'as1@asd.com', phone: '123 345 678', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
        employee: { name: 'User 4', id: 4, email: 'as4@asd.com', phone: '876 895 234', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
        subtitle: "02:00h · 03:30' - 15",
        footer: 'Pista 7',
        start: '2023-04-15T02:00:00',
        end: '2023-04-15T03:30:00',
        entityId: 300,
        id: 5,
        color: 'salmon',
        product: { name: 'Bailamos por sevillanas', id: 5 },
    }),
    new Booking({
        name: 'Evento random',
        user: { name: 'User 1', id: 1, email: 'as1@asd.com', phone: '123 345 678', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
        employee: { name: 'User 4', id: 4, email: 'as4@asd.com', phone: '876 895 234', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
        subtitle: "01:00h · 02:00' - 14",
        footer: 'Pista 7',
        start: '2023-04-14T01:00:00',
        end: '2023-04-14T02:00:00',
        entityId: 300,
        id: 6,
        color: 'primary',
        product: { name: 'Body Art', id: 6 },
    }),
    new Booking({
        name: 'Otro evento',
        user: { name: 'User 1', id: 1, email: 'as1@asd.com', phone: '123 345 678', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
        employee: { name: 'User 4', id: 4, email: 'as4@asd.com', phone: '876 895 234', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
        subtitle: "23:00h · 00:00' - 16",
        footer: 'Dana Oriental',
        start: '2023-04-16T23:00:00',
        end: '2023-04-16T00:00:00',
        entityId: 300,
        id: 7,
        product: { name: '', id: 7 },
    })
]