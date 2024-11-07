import { Types, defineComponent } from 'bitecs'

export default defineComponent({
    src: [Types.ui8, 32],

    y: Types.f32,
    x: Types.f32,

    width: Types.ui8,
    height: Types.ui8,
})
