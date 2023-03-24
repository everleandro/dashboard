
export const iconFactory: Record<string, string> = {
    dollar: "dollar",
    card: "card",
    holidays: "holidays",
    message: "message",
    replacements: "replacements",
    reports: "reports",
    schedule: "schedule",
    sessions: "sessions",
    logout: "logout",
    incidents: "incidents",
    arrowDown: "arrow-down",
    clear: "arrow-down",
    pickerIconPrev: "arrow-down",
    pickerIconNext: "arrow-down",
    arrowUp: "arrow-up",
    events: "events",
    dashboard: "dashboard",
    staff: "staff",
    maintenance: "maintenance",
    checking: "checking",
    ads: "ads",
    notification: "notification",
    remuneration: "remuneration",
    hamburger: "hamburger",
    accounting: "accounting",
    customer: "customer",
    booking: "booking",
    search: "search",
    grid: "grid",
    list: "list",
    edit: "edit",
    customerInfo: "customer-info",
    providers: "providers"
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            icon: iconFactory
        }
    }
})