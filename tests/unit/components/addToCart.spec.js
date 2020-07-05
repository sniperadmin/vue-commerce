import { shallowMount, createLocalVue } from '@vue/test-utils'
import AddToCart from '@/components/AddToCart.vue'
import BootstrapVue from 'bootstrap-vue'

let wrapper

describe('MiniCart.vue', () => {
  const localVue = createLocalVue()

  localVue.use(BootstrapVue)
  
  beforeEach(() => {
    wrapper = shallowMount(AddToCart, {
      localVue,
      mocks: {
        $t: () => 'Add to cart',
        $store: {
          commit: jest.fn(),
          state: {
            cart: []
          },
          mutations: {
            addToCart: jest.fn()
          }
        }
      }
    })
  })
  
  it('should be vue component', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should load the title', () => {
    const title = wrapper.find('.h5-responsive')
    expect(title.text()).toBe('Add to cart')
  })

  it('should load and test button', () => {
    const btn = wrapper.find('b-button-stub')
    const mockedaddToCart = jest.spyOn(wrapper.vm, 'addToCart')

    expect(btn.exists()).toBe(true)

    wrapper.vm.$on('click', mockedaddToCart)
    btn.trigger('click')
    wrapper.vm.$emit('click')
    wrapper.vm.$nextTick()

    expect(mockedaddToCart).toHaveBeenCalled()
  })
})