import { shallowMount, createLocalVue } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import GithubLogin from '@/components/logins/GithubLogin.vue'
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

describe('GithubLogin.vue', () => {
  const localVue = createLocalVue()

  localVue.use(BootstrapVue)
  localVue.use(Router)

  const router = new Router()

  beforeEach(() => {
    wrapper = shallowMount(GithubLogin, {
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
    const mockLogin = jest.spyOn(wrapper.vm, 'loginGit')

    wrapper.vm.$on('click', mockLogin)
    wrapper.vm.$emit('click')

    expect(mockLogin).toHaveBeenCalled()
  })
})
