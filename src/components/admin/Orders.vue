<template>
  <div class="orders">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6">
            <h1>Orders Page</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Quaerat quae quisquam quos necessitatibus, nisi, mollitia 
              temporibus expedita aliquam itaque exercitationem qui fugit 
              facere? Temporibus enim aperiam soluta ratione maxime beatae!
            </p>
          </div>
          <div class="col-md-6">
              <img src="@/assets/img/orders.svg" class="img-fluid" alt="overview image">
          </div>
        </div>
          <!-- code here! -->
          <b-alert show variant="warning">
            <h4 class="alert-heading"> <i class="fas fa-exclamation-triangle"></i> under construction</h4>
            <hr>
            <p>
              the order tracking feature is currently under construction
            </p>
            <hr>
            <p class="mb-0">
              sorry for inconvinience
            </p>
          </b-alert>

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

      readData(){

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

          this.$firestore.products.doc(doc['.key']).delete();

              toast.fire({
                type: 'success',
                title: 'Deleted successfully'
              });
        }
      })
      }
    }, // -- end methods -- //
    
    created: function() {
      this.readData();
      
    },

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
