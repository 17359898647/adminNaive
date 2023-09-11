import { assign } from 'lodash-es'
import type { CSSProperties } from 'vue'
import { defineComponent } from 'vue'
import './loading.css'
import { useSleep } from '@/composables/useSleep'

export const LoadingView = defineComponent({
  name: 'AppLoading',
  props: {
    isTitle: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => (
      <div class="absolute inset-0 flex-center">
        <svg class="w-0">
          <defs>
            <filter id="gegga">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur"/>
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"
                result="inreGegga"
              />
              <feComposite in="SourceGraphic" in2="inreGegga" operator="atop"/>
            </filter>
          </defs>
        </svg>
        <svg
          class="snurra"
          style={{
            filter: 'url(#gegga)',
          }}
          width="200"
          height="200"
          viewBox="0 0 200 200"
        >
          <defs>
            <linearGradient id="linjärGradient">
              <stop
                class="stopp1"
                style={
                  {
                    stopColor: '#f700a8',
                  } as CSSProperties
                }
                offset="0"
              />
              <stop
                style={
                  {
                    stopColor: '#ff8000',
                  } as CSSProperties
                }
                class="stopp2"
                offset="1"
              />
            </linearGradient>
            <linearGradient
              y2="160"
              x2="160"
              y1="40"
              x1="40"
              gradientUnits="userSpaceOnUse"
              id="gradient"
              xlinkHref="#linjärGradient"
            />
          </defs>
          <path
            class="halvan"
            d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
          />
          <circle class="strecken" cx="100" cy="100" r="64"/>
        </svg>
        <svg class="skugga" width="200" height="200" viewBox="0 0 200 200">
          <path
            class="halvan"
            d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
          />
          <circle class="strecken" cx="100" cy="100" r="64"/>
        </svg>
        <div class={['absolute text-red']}>{props.isTitle}</div>
      </div>
    )
  },
})

export async function loadingFn(config?: { timeOut?: number; isTitle?: string }) {
  const { timeOut = 0, isTitle = '' } = assign(
    {
      timeOut: 0.5,
    },
    config,
  )
  const appLoading = createApp(<LoadingView isTitle={isTitle}/>)
  appLoading.mount('#app')
  await useSleep(timeOut * 1000)
  return appLoading
}
