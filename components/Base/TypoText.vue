<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  functional: true,
  render(h, { $style, props, data, children }) {
    return h(
      props.tag,
      {
        ...data,
        class: [$style[props.version], ...(Array.isArray(data.class) ? data.class : [data.class])],
      },
      children,
    )
  },
})
export default class TypoText extends Vue {
  @Prop({ type: String, default: 'p' }) tag!: string
  @Prop({ type: String, default: 'style-6' }) version!: string
}
</script>

<style lang="sass" module>
.style-0
  +style-0

.style-1
  +style-1

.style-2
  +style-2

.style-3
  +style-3

.style-4
  +style-4

.style-5
  +style-5

.style-6
  +style-6

.style-7
  +style-7

.style-8
  +style-8

.style-9
  +style-9

.style-10
  +style-10
</style>
