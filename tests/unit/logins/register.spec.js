import { shallowMount, createLocalVue } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import Register from '@/components/logins/Register.vue'
import VueProgressBar from 'vue-progressbar'

let wrapper

describe('Register.vue', () => {
  const localVue = createLocalVue()

  localVue.use(BootstrapVue)
  localVue.use(Router)
  localVue.use(VueProgressBar)

  const router = new Router()

  beforeEach(() => {
    wrapper = shallowMount(Register, {
      localVue,
      router,
      mocks: {
        $t: jest.fn(),
      },
      data() {
        return {
          email: 'test@me.com',
          password: '123456',
        }
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    wrapper.destroy()
  })
  
  it('should be vue', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should hide modal', () => {
    const mockedhide = jest.spyOn(wrapper.vm, 'hideModal')
      .mockImplementation(() => jest.fn())

    wrapper.vm.$on('click', mockedhide)
    wrapper.vm.$emit('click')

    expect(mockedhide).toHaveBeenCalled()
  })

  it('should hide modal', () => {
    const mockedlogin = jest.spyOn(wrapper.vm, 'login')

    wrapper.vm.$on('click', mockedlogin)
    wrapper.vm.$emit('click')

    expect(mockedlogin).toHaveBeenCalled()
  })

  it('should hide modal', () => {
    const mockedlogin = jest.spyOn(wrapper.vm, 'register')

    wrapper.vm.$on('click', mockedlogin)
    wrapper.vm.$emit('click')

    expect(mockedlogin).toHaveBeenCalled()
  })
})
