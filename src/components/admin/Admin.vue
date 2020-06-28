<template>
	<div class="hello">
		<div class="page-wrapper default-theme sidebar-bg bg1" :class="{ active : isActive, 'toggled' : acting}"
			v-if="isAdmin">
			<nav id="sidebar" class="sidebar-wrapper">

				<div class="sidebar-content">
					<!-- sidebar-brand  -->
					<SidebarBrand @click="acting = !acting" />
					<!-- sidebar-header  -->
					<SidebarHeader :email="email" />
					<!-- sidebar-search  -->
					<SidebarSearch />
					<!-- sidebar-menu  -->
					<sidebar-menu
						@logout="logout"
						:productsBadgeLength="products.length"
						:usersBageLength="users.length"
					/>
					<!-- sidebar-menu  -->
				</div>
			</nav>

			<!-- page-content  -->
			<main class="page-content pt-2">
				<div class="container-fluid">
					<div class="row">
						<div class="form-group col-md-12">
							<!-- toggler -->
							<transition name="fade">
								<b-button class="btn btn-sm btn-dark position-fixed d-block float-left" v-if="!acting"
									@click="acting = !acting" style="left: 10px; opacity: 0.5; z-index: 1; top: 30px;">
									<i class="fas fa-bars"></i>
								</b-button>
							</transition>

							<router-view></router-view>
						</div>
					</div>
				</div>
			</main>
			<!-- page-content" -->
		</div>
		<!-- page-wrapper -->
	</div>
</template>

<script>
	// global {$, jQuery}
	import {
		SidebarMenu,
		SidebarBrand,
		SidebarHeader,
		SidebarSearch
  }
  from '../shared/admin/sidebar'
	import {
		db,
		fbAuth
	} from '@/assets/js/firebase';
	import {
		mdbBadge
	} from 'mdbvue';
	import {
		mapGetters,
		mapState
	} from 'vuex';
	export default {
		name: "admin",
		props: {
			msg: String
		},
		components: {
			mdbBadge,
			SidebarMenu,
			SidebarBrand,
			SidebarHeader,
			SidebarSearch,
		},
		data() {
			return {
				isActive: true,
				acting: true,
				name: null,
				email: null,
				isAdmin: null,
				products: [],
			}
		},
		methods: {
			logout() {
				fbAuth.auth().signOut()
					.then(() => {
						this.$router.replace('/');
					})
					.catch((response, err) => {
						console.log(err);
					});
			},
		},
		computed: mapState({
			users: state => state.users
		}),

		created() {
			fbAuth.auth().onAuthStateChanged(user => {
				if (user) {
					user.getIdTokenResult().then(idTokenResult => {
						user.admin = idTokenResult.claims.admin;
						this.isAdmin = user.admin
						if (user.admin != true) {
							this.$router.push('/')
						} else {
							var userInfo = fbAuth.auth().currentUser;
							this.email = userInfo.email;
						}
					});
				}
			});

			db.collection("products").onSnapshot(snapShot => {
				snapShot.forEach(doc => {
					this.products.push(doc.data())
				});
			});

			this.$store.dispatch('listAllUsers')

			console.log(this.users.length)
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.custom {
		left: 0;
	}
</style>