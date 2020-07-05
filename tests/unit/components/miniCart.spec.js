import { shallowMount, createLocalVue } from '@vue/test-utils'
import MiniCart from '@/components/MiniCart.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'

let wrapper

describe('MiniCart.vue', () => {
  const localVue = createLocalVue()

  localVue.filter('currency', jest.fn())
  localVue.use(BootstrapVue)
  localVue.use(VueRouter)

  const router = new VueRouter()

  beforeEach(() => {
    wrapper = shallowMount(MiniCart, {
      localVue,
      router,
      mocks: {
        $store: {
          state: {
            cart: [
              { productName: 'item1', productPrice: 20 },
              { productName: 'item2', productPrice: 20 }
            ]
          },
          mutations: {
            removeData: jest.fn()
          }
        }
      }
    })
  })
  it('should be vue component', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should test checkOut()', () => {
    const mockedCheckout = jest.spyOn(wrapper.vm, 'checkOut')

    wrapper.vm.$on('click', mockedCheckout)
    wrapper.vm.$emit('click')

    expect(mockedCheckout).toHaveBeenCalled()
    expect(wrapper.vm.$route.path).toEqual('/en/checkout')
  })
})
