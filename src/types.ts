export type MessageStruct = {
    name: string
    message: string
    now: number | Date
}

export type MessageSource = {
    name: string
    nickname?: string
    message: string
    date?: string
    now: number
}

export type SourceData = {
    path: string
    data: SourceList | MessageSource
}

export type SourceList = Record<string, MessageSource>
