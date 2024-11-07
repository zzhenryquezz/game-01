import { Types, defineComponent } from 'bitecs'

export default defineComponent({
    state: Types.ui8,

    speed: Types.ui8,

    framesCount: Types.ui8,
    framesX: [Types.ui8, 10],
    framesY: [Types.ui8, 10],
})
