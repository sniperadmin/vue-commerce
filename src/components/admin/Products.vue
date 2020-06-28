<template>
  <div class="Products">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6">
            <h1>{{ $t('adminPage.products.title') }}</h1>
            <p>{{ $t('adminPage.products.text') }}</p>
          </div>
          <div class="col-md-6">
              <img src="@/assets/img/products.svg" class="img-fluid" alt="overview image">
          </div>
        </div>
        
        <!-- body -->
        <div class="mt-2 mb-2 p-1 row justify-content-between">
          <h3 class="d-inline-block">{{ $t('adminPage.products.list-title') }}</h3>
          <b-button class="p-2 mt-0" variant="success" @click="createNew">{{ $t('adminPage.products.list-button') }}</b-button>
        </div><!-- ./body -->

        <b-row align-h="between">

          <!-- search -->
          <b-col md="5">
          <b-form-group :label="$t('search.label')" label-cols-sm="3" label-align-sm="right" label-size="sm"
                        label-for="filterInput" class="mb-0">
              <b-input-group size="sm">
                <b-form-input @input="searchNow()" v-model="search" type="search" id="filterInput" :placeholder="$t('search.input')">
                  </b-form-input>
                    <b-input-group-append>
                      <b-button :disabled="!search" @click="search = ''">{{ $t('search.clear') }}</b-button>
                        </b-input-group-append>
              </b-input-group>
          </b-form-group>
          </b-col><!-- ./search -->

          <b-col md="5">
            <h5 class="h2-responsive">{{ $t('total') }}
              <b-badge>{{ !search ? products.length : searchResults.length }}</b-badge>
            </h5>
          </b-col>

        </b-row>

          <div class="table-responsive table-bordered text-center mt-4">
            <table class="table p-0">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">{{ $t('adminPage.products.table.images') }}</th>
                  <th scope="col">{{ $t('adminPage.products.table.name') }}</th>
                  <th scope="col">{{ $t('adminPage.products.table.categories') }}</th>
                  <th scope="col">{{ $t('adminPage.products.table.price') }}</th>
                  <th scope="col">{{ $t('adminPage.products.table.modify.title') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, index) in !search ? products : searchResults" :key="index">
                  <td>
                    <img v-for="(image) in product.images" :key="image.id" :src="image" alt="product images" class="img-fluid" style="width:80px">
                  </td>
                  <td>{{ product.name }}</td>
                  <td>
                    <b-badge variant="dark text-warning">
                      <h5 class="h5-responsive">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>
                          {{ $t('alerts.graph-construction.title') }}
                        </span>
                      </h5>
                    </b-badge>
                  </td>
                  <td>{{product.price | currency}}</td>
                  <td>
                    <b-button variant="primary" @click="editProduct(product)"><i class="fas fa-edit"></i></b-button>
                    <b-button variant="danger" @click="deleteProduct(product)"><i class="fas fa-trash"></i></b-button>
                  </td>
                </tr>
                <!-- no search results -->
                <mdb-alert v-if="search && !searchResults.length" color="warning" class="text-center">
                  {{ $t('search.no-res') }}
                </mdb-alert>
              </tbody>
            </table>
          <!-- loader component -->
            <bar-loader :loading="loading" :color="`#3C36D7`" :height="8" :sizeUnit="`px`" class="w-100"></bar-loader>
            <!-- ./loader component -->
          </div> <!-- table -->

          <!-- loader component -->
            <bar-loader :loading="loading" :color="`#3C36D7`" :height="8" :sizeUnit="`px`" class="w-100"></bar-loader>
          <!-- ./loader component -->

          <!-- modal -->
          <b-modal ref="edit" centered id="product" size="xl">
            <div slot="modal-title">
              <h3 v-if="modal === 'new'">{{ $t('adminPage.products.add-product.new-title') }}</h3>
              <h3 v-if="modal === 'edit'">{{ $t('adminPage.products.add-product.edit-title') }}</h3>
            </div>
            <mdb-row>
            <mdb-col lg="8">
              <mdb-input :label="$t('adminPage.products.add-product.product-name')" type="text" v-model="product.name"/>
                
                <!-- select category -->
                <mdb-row  class="mt-1 mb-1">
                <mdb-col lg="10">
                  <select class="browser-default custom-select mb-2">
                    <option selected disabled>under construction</option>
                    <!-- <option>{{ category }}</option> -->
                    <option> under construction </option>
                  </select>
                </mdb-col>
                  <mdb-col lg="2">
                    <b-button variant="outline-success" v-b-modal.add class="pt-1 pb-0 pr-1 pl-1"><i class="fas fa-plus"></i>
                    <span class="ml-2">add</span>
                    </b-button>
                  </mdb-col>
                </mdb-row><!-- ./select category -->

                <div class="input-group">
                    <div class="input-group-prepend mb-4">
                      <span class="input-group-text h-100" id="basic-addon">
                        <i class="fas fa-pencil-alt prefix"></i>
                      </span>
                          <vue-editor class="w-100 h-75" v-model="product.info"></vue-editor>
                      </div>
                    <!-- <textarea v-model="product.info" class="form-control" rows="9"></textarea> -->
                    <div class="w-100 h-25">
                    </div>
                </div>
            </mdb-col>

            <mdb-col>
              <h1 class="h1-responsive mt-4 mb-4">{{ $t('adminPage.products.add-product.product-details') }}</h1>
              
              <mdb-input :placeholder="$t('adminPage.products.add-product.product-price')" basic class="mb-3" v-model="product.price">
                <span class="input-group-text" slot="prepend">$</span>
                <!-- <span class="input-group-text" v-if="product.price" slot="prepend">{{product.price}}</span>
                <span class="input-group-text" v-else slot="prepend">0.00</span> -->
              </mdb-input>

              <!-- <mdb-input label="Product Tags" type="text" v-model="product.tags" @keyup.enter="addTag"></mdb-input> -->
              <div class="form-group">
                <label for="example1">{{ $t('adminPage.products.add-product.tags') }}</label>
                <input v-model="tag" @keyup.188="addTag" type="text" id="example1" class="form-control">
                  <div class="d-flex">
                    <b-badge variant="dark" v-for="(tag, index) in product.tags" :key="index" class="mr-2 mt-2 p-2">
                      <span>{{tag}}</span> <i @click="remove(tag)" class="fas fa-trash ml-2 fa-lg"></i>
                    </b-badge>
                  </div>
              </div>
              <div class="input-group">
                <!-- <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                </div>
                <div class="custom-file">
                  <input type="file" @change="uploadImage" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
                  <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                </div> --> 
                
                <b-form-file @change="uploadImage" class="mb-3" accept="image/*" multiple
                      :placeholder="$t('adminPage.products.add-product.choose')"
                      drop-placeholder="Drop file here..."
                    >
                    <template slot="file-name" slot-scope="{ names }">
                      <b-badge variant="dark">{{ names[0] }}</b-badge>
                      <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
                        + {{ names.length - 1 }} More files
                      </b-badge>
                    </template>
                    </b-form-file>
              </div>
              <div class="form-group d-flex pt-2">
                <div class="p-1" v-for="(image, index) in product.images" :key="index">
                  <div class="img-small-wrap">
                    <img v-if="image" :src="image" :alt="product.name" width="80px">
                    <span class="delete-img" @click="deleteImage(image, index)">X</span>
                  </div>
                </div>
              
              </div>

            </mdb-col>
            </mdb-row>

            <template slot="modal-footer" slot-scope="{cancel}">
              <b-button variant="success" @click="addProduct" v-if="modal == 'new'">{{ $t('adminPage.products.add-product.create') }}</b-button>
              <b-button variant="success" @click="updateProduct()" v-if="modal == 'edit'">{{ $t('adminPage.products.add-product.save') }}</b-button>
              <b-button variant="danger" @click="cancel()">{{ $t('adminPage.products.add-product.cancel') }}</b-button>
            </template>
          </b-modal>
          <b-modal id="add" size="sm" title="create category" centered ok-only>
            <div class="row justify-content-center">
              
              <b-badge variant="dark text-warning">
                    <h5 class="h5-responsive">
                      <i class="fas fa-exclamation-triangle"></i>
                      <span>
                        under construction
                      </span>
                    </h5>
                  </b-badge>
            </div>
            
          </b-modal>

        </div>
      </div>
    </div>
</template>
<script>
// Advanced Use - Hook into Quill's API for Custom Functionality

import { BarLoader } from '@saeris/vue-spinners';
import { VueEditor } from "vue2-editor";
import { fbAuth, db } from "@/assets/js/firebase";
import {
    mdbInput,
    mdbBtn,
    mdbRow,
    mdbCol,
    mdbDatatable, 
    mdbContainer,
  } from 'mdbvue';
export default {
  name: "products",
  props: {
  },
  components: {
      mdbInput,
      mdbBtn,
      mdbRow,
      mdbCol,
      mdbDatatable, 
      mdbContainer,
      VueEditor,
    },
    data() {
      return {
        products: [], //products
        product: { //single product
          name: null,
          categories: [],
          info: null,
          price: null,
          tags: [],
          images: [],
        },
        activeItem:null, //active selected item
        files: [],
        modal: null,
        tag: '', // single tag
        loading: false,
        search: '',
        searchResults: [],
        
      }
    },
    // this is a method to fetch data
    // firestore () {
    //   return {
    //     // Collection
    //     products: db.collection('products'),
    //   }
    // },
    computed: {
      // ..
    },
    methods: {
      addTag(){
        // Checker for null array
        this.product.tags = this.product.tags || [];
        // pushing each tagword
        if(this.product.tags.length <= 5)
        this.product.tags.push(this.tag.slice(0, -1));

        this.tag = '';
        console.log(this.product.tags);
      },
      remove (item) {
        this.product.tags.splice(this.product.tags.indexOf(item), 1)
      },
      uploadImage(e) {
        let that = this; 
        if (e.target.files) {
          for (var i in Object.entries(e.target.files)) {
            let file = e.target.files[i];
            multiUpload(file);
          }
          function multiUpload(file) {

            var storageRef = fbAuth.storage().ref('products/' + file.name);
            var uploadTask = storageRef.put(file);
            
            uploadTask.on('state_changed', (snapshot) => {
              
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');

            }, (error) =>  {
              // Handle unsuccessful uploads
                  console.log(error)
                }, () =>  {
                  // Handle successful uploads on complete
                  uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    // var downloadURL = uploadTask.snapshot.ref.downloadURL;
                      let images = that.product.images || [];
                      images = images.push(downloadURL)
                  })
                });
            }
        }
      },
      deleteImage(img, index) {
        let image = fbAuth.storage().refFromURL(img)
        // console.log(image);
        this.product.images.splice(index, 1);
        image.delete().then(()=> {
          console.log('Image deleted');
        }).catch((err)=>{
          console.log(err);
        });
      },
      handleChange(v) {
        this.files = v;
      },
      reset() {
        this.product = {
          name: null,
          price: null,
          info: null,
          tags: [],
          images: [],
        }
      },
      createNew() {
        this.modal = 'new';
        this.reset()
        this.$refs.edit.show()
        },
      addProduct() {
        this.$firestore.products.add(this.product);
        this.$refs.edit.hide()   
        // .catch(function(error) {
        //     console.error("Error adding document: ", error);
        // });
      },
      editProduct(product) {
        this.modal = 'edit';
        this.product = product;
        this.activeItem = JSON.stringify(product)
        this.$refs.edit.show();
      },
      updateProduct() {
        // Update function has issues so I have to apply this work-around
        // this.$firestore.products.doc(this.product['.key']).set(this.product).then(() => {
        //   this.$firestore.products.doc(this.activeItem).delete()}).then(()=>{
            // this.$refs.edit.hide()
              // toast.fire({
              //     type: 'success',
              //     title: 'Updated successfully'
              // });
        //   });

        this.$firestore.products.doc(this.product.id).update(this.product).then(() => {
          this.$refs.edit.hide()
              toast.fire({
                  type: 'success',
                  title: 'Updated successfully'
              });
          });
      },
      deleteProduct(doc) {
        Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {

          this.$firestore.products.doc(doc.id).delete();
          
          for (var img in doc.images) {
            fbAuth.storage().refFromURL(doc.images[img]).delete().then(() => {console.log('image deleted')}).catch((err) => {console.log(err)})
            // console.log(doc.images[img])
          }

          toast.fire({
            type: 'success',
            title: 'Deleted successfully'
          });
        }
      })
      },
      searchNow() {
          this.searchResults = this.products.filter(product => {
                  if (product.name
                      .toLowerCase()
                      .indexOf(this.search.toLowerCase()) != "-1"
                  ) {
                    return product;
                  }
                });
            },
    }, // -- end methods -- //
    created() {
      // Binding Collections
      this.$binding("products", db.collection("products"))
      .then(products => {
        this.products = products; // => __ob__: Observer
        console.log(this.products)
      })
    }
}
</script>
<style scoped>
.img-small-wrap {
  position: relative;
}
  .img-small-wrap .delete-img {
    position: absolute;
    top: -14px;
    right: -2px;
    cursor: pointer;
  }
</style>
