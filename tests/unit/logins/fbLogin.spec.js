import { shallowMount, createLocalVue } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import FbLogin from '@/components/logins/FbLogin.vue'
import firebase from 'firebase'

let wrapper

const signInWithPopup = jest.fn(() => {
  return Promise.resolve('results for signInWithPopup')
})

const initializeApp = jest.spyOn(firebase, 'initializeApp')
  .mockImplementation(() => {
    return {
      auth: () => {
        return {
          signInWithPopup
        }
      }
    }
  })

initializeApp()

describe('FbLogin.vue', () => {
  const localVue = createLocalVue()

  localVue.use(BootstrapVue)
  localVue.use(Router)

  const router = new Router()

  beforeEach(() => {
    wrapper = shallowMount(FbLogin, {
      localVue,
      router,
      mocks: {
        $t: jest.fn(),
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    wrapper.destroy()
  })
  
  it('should be vue', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('tests methods', () => {
    const mockfbLogin = jest.spyOn(wrapper.vm, 'fbLogin')

    wrapper.vm.$on('click', mockfbLogin)
    wrapper.vm.$emit('click')

    expect(mockfbLogin).toHaveBeenCalled()
  })
})
