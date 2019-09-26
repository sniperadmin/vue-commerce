<template>
  <div class="Products">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6">
            <h1>categories page</h1>
            <p>{{ $t('adminPage.products.text') }}</p>
          </div>
          <div class="col-md-6">
              <img src="@/assets/img/products.svg" class="img-fluid" alt="overview image">
          </div>
        </div>
        
        
          <div class="mt-2 mb-2 p-1 row justify-content-between">
              <h3 class="d-inline-block">categories list</h3>
              <b-button class="p-2 mt-0" variant="success" disabled @click="createNew">New category</b-button>
          </div>

          <b-alert show variant="warning">
            <h4 class="alert-heading"> <i class="fas fa-exclamation-triangle"></i> under construction</h4>
            <hr>
            <p>
              the categories feature is currently under construction
            </p>
            <hr>
            <p class="mb-0">
              sorry for inconvinience
            </p>
          </b-alert>

          <div class="table-responsive table-bordered text-center">
          
          <table class="table p-0">
            <thead>
              <tr>
                <th>category name</th>
                <th>products</th>
                <th>{{ $t('adminPage.products.table.modify.title') }}</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>
                  <b-button variant="primary" disabled @click="editProduct(product)">{{ $t('adminPage.products.table.modify.edit') }}</b-button>
                  <b-button variant="danger" disabled @click="deleteProduct(product)">{{ $t('adminPage.products.table.modify.delete') }}</b-button>
                </td>
              </tr>
              
            </tbody>
          </table>
          </div> <!-- table -->
          
          <!-- loader component -->
            <bar-loader :loading="loading" :color="`#3C36D7`" :height="8" :sizeUnit="`px`" class="w-100"></bar-loader>
          <!-- ./loader component -->

          <!-- modal -->
          <b-modal ref="edit" centered id="product">
            <div slot="modal-title">
              <h3 v-if="modal === 'new'">new category</h3>
              <h3 v-if="modal === 'edit'">edit category</h3>
            </div>

              <div class="container">
                <mdb-col lg="8">
                  <mdb-input label="category name" type="text" v-model="category.name"/>
                </mdb-col>
              </div>
              
              <mdb-col lg="12">
                <div class="input-group">
                    <div class="input-group-prepend mb-4">
                      <span class="input-group-text h-100" id="basic-addon">
                        <i class="fas fa-pencil-alt prefix"></i>
                      </span>
                          <vue-editor class="w-100 h-75" v-model="category.description"></vue-editor>
                      </div>
                    <!-- <textarea v-model="product.info" class="form-control" rows="9"></textarea> -->
                    <div class="w-100 h-25">
                    </div>
                </div>
              </mdb-col>
           

            <template slot="modal-footer" slot-scope="{cancel}">
              <b-button variant="success" @click="addCategory" v-if="modal == 'new'">{{ $t('adminPage.products.add-product.create') }}</b-button>
              <b-button variant="success" @click="updateCategory()" v-if="modal == 'edit'">{{ $t('adminPage.products.add-product.save') }}</b-button>
              <b-button variant="danger" @click="cancel()">{{ $t('adminPage.products.add-product.cancel') }}</b-button>
            </template>
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
        category: {
          name: null,
          description: null,
        },
        products: [], //products
        modal: null,
        loading: false,
        
      }
    },
    firestore () {
      return {
        // Collection
        categories: db.collection('categories'),
      }
    },

    methods: {
      // remove (item) {
      //   this.product.tags.splice(this.product.tags.indexOf(item), 1)
      // },
      createNew() {
        this.modal = 'new';
        // this.reset()
        this.$refs.edit.show()
        },
      addCategory() {
        this.$firestore.categories.add(this.category);
        this.$refs.edit.hide()
      },
      editCategory(product) {
        // code ...
      },
      updateCategory() {
        // code ...
      },
      deleteCategory(doc) {
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

         // code ...

          toast.fire({
            type: 'warning',
            title: 'under construction'
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
