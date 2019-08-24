<template>
  <div class="Products">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6">
            <h1>Products Page</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Quaerat quae quisquam quos necessitatibus, nisi, mollitia 
              temporibus expedita aliquam itaque exercitationem qui fugit 
              facere? Temporibus enim aperiam soluta ratione maxime beatae!
            </p>
          </div>
          <div class="col-md-6">
              <img src="@/assets/img/products.svg" class="img-fluid" alt="overview image">
          </div>
        </div>
        
        
          <div class="mt-2 mb-2 p-1">
            <h3 class="d-inline-block">products list</h3>
            <b-button class="p-2 mt-0 float-right" variant="success" @click="createNew">add product</b-button>
          </div>
          <div class="table-responsive table-bordered text-center">
          <table class="table p-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>

              <tr v-for="product in products" :key="product.id">
                <td>{{product.name}}</td>
                <td>{{product.price}}</td>
                <td>
                  <b-button variant="primary" @click="editProduct(product)">Edit</b-button>
                  <b-button variant="danger" @click="deleteProduct(product)">Delete</b-button>
                </td>
              </tr>
              
            </tbody>
          </table>
          </div> <!-- table -->
          
          <!-- modal -->
          <b-modal ref="edit" centered id="product" size="xl" title="Edit Product">
            <mdb-row>
            <mdb-col lg="8">
              <mdb-input label="Product Name" type="text" v-model="product.name"/>
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
              <h1 class="h1-responsive mt-4 mb-4">Product Details</h1>
              
              <mdb-input placeholder="Product Price" basic class="mb-3" v-model="product.price">
                <span class="input-group-text" slot="prepend">$</span>
                <!-- <span class="input-group-text" v-if="product.price" slot="prepend">{{product.price}}</span>
                <span class="input-group-text" v-else slot="prepend">0.00</span> -->
              </mdb-input>
                          
              <!-- <mdb-input label="Product Tags" type="text" v-model="product.tags" @keyup.enter="addTag"></mdb-input> -->
              <div class="form-group">
                <label for="example1">tags</label>
                <input v-model="tag" @keyup.188="addTag" type="text" id="example1" class="form-control">
                  <div class="d-flex">
                    <b-badge variant="dark" v-for="tag in product.tags" :key="tag" class="mr-2 mt-2 p-2">
                      {{tag}}
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
                <b-form-file class="mb-3" @change="uploadImage"
                      placeholder="Choose a file..."
                      drop-placeholder="Drop file here..."
                    ></b-form-file>
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
              <b-button variant="success" @click="addProduct" v-if="modal == 'new'">Create</b-button>
              <b-button variant="success" @click="updateProduct()" v-if="modal == 'edit'">Save Updates</b-button>
              <b-button variant="danger" @click="cancel()">Cancel</b-button>
            </template>
          </b-modal>

        </div>
      </div>
    </div>
</template>
<script>
// Advanced Use - Hook into Quill's API for Custom Functionality
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
import { type } from 'os';
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
          info: null,
          price: null,
          tags: [],
          images: [],
        },
        activeItem:null, //active selected item
        files: [],
        modal: null,
        tag: '', // single tag
        
      }
    },
    firestore () {
      return {
        // Collection
        products: db.collection('products'),
      }
    },

    methods: {
      addTag(){
        // Checker for null array
        this.product.tags = this.product.tags || [];
        // pushing each tagword
        this.product.tags.push(this.tag.slice(0, -1));

        this.tag = '';
        console.log(this.product.tags);
      },
      uploadImage(e){
        if (e.target.files[0]) {
          let file = e.target.files[0];
          var storageRef = fbAuth.storage().ref('products/' + file.name);
  
          var uploadTask = storageRef.put(file);
  
          uploadTask.on('state_changed', (snapshot) => {
          
          }, (error) => {
            // Handle unsuccessful uploads
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.product.images = this.product.images || [];
              this.product.images.push(downloadURL);
              console.log('File available at', downloadURL);
            });

          });
        }
              // console.log(this.product.images)
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
            //   toast.fire({
            //       type: 'success',
            //       title: 'Updated successfully'
            //   });
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
      }).then((result) => {
        if (result.value) {
          this.$firestore.products.doc(doc.id).delete();

              toast.fire({
                type: 'success',
                title: 'Deleted successfully'
              });
        }
      })
      }
    }, // -- end methods -- //
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
