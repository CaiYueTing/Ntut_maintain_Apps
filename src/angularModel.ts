export type MaintainSheet = {
    id: string,
    name: string,
    phone: string,
    time: string,
    locate: string,
    item: string,
    maintainState: string,
    lineId: string
    doneBy: string
}

export type Admin = {
    id: string,
    name: string,
    email: string,
    phone: string,
    role: string,
    maintainCount: number,
    maintainTotal: number
}
