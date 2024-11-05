export function decode(payload: any) {
    return new TextDecoder().decode(payload)
}

export function encode(payload: string) {
    return new TextEncoder().encode(payload)
}
