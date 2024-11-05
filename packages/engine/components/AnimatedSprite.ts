import { Types, defineComponent } from 'bitecs'

export default defineComponent({
    src: [Types.ui8, 32],

    width: Types.f32,
    height: Types.f32,

    frameWidth: Types.ui8,
    frameHeight: Types.ui8,

    frameX: Types.ui8,
    frameY: Types.ui8,
})
