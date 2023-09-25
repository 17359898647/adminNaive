import { NButton } from 'naive-ui'

export default defineComponent({
  name: 'demoView',
  setup() {
    return () => (
      <div>
        <NButton
          round={true}
        >
          Hello
          {' '}
          World
        </NButton>
      </div>
    )
  },
})
