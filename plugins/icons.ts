
export const iconFactory: Record<string, string> = {
    accountCheck: "account-check",
    accountEdit: "account-edit",
    accountCancel: "account-cancel",
    arrowUp: "chevron-up",
    arrowRight: "chevron-right",
    arrowLeft: "chevron-left",
    arrowDown: "chevron-down",
    accounting: "accounting",
    ads: "ads",
    booking: "booking",
    card: "card",
    calendar: "calendar",
    customerInfo: "customer-info",
    checking: "checking",
    clear: "close",
    close: "close",
    customer: "customer",
    dashboard: "dashboard",
    dotsVertical: "dots-vertical",
    events: "events",
    email: "email",
    pencil: "pencil",
    grid: "grid",
    holidays: "holidays",
    menu: "menu",
    incidents: "incidents",
    logout: "logout",
    list: "list",
    message: "message",
    maintenance: "maintenance",
    notification: "notification",
    pickerIconPrev: "chevron-left",
    pickerIconNext: "chevron-right",
    providers: "providers",
    phone: "phone",
    replacements: "replacements",
    reports: "reports",
    remuneration: "remuneration",
    schedule: "schedule",
    sessions: "sessions",
    staff: "staff",
    search: "search",
    sendEmail: "send-email",
    wallet: "wallet",

}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            icon: iconFactory
        }
    }
})